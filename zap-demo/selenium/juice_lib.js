let mod = {
  driver: null,
  By: null,
  sleep: function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  fs: require('fs'),
  /*
  * Require a raw WebDriver object from the official node module,configure it to our needs and set it as property of this module.
  * Full documentation of the involved classes and methods can be found at
  * http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html
  * @return the full node modul
  */
  init: function(zap_host, zap_port) {
    let webdriver = require('selenium-webdriver'),
        By = webdriver.By,
        until = webdriver.until;

    let firefox = require('selenium-webdriver/firefox');
    //choose firefox binary which was copied to the docker image
    //let binary = new firefox.Binary(firefox.Channel.AURORA);
    //run in headless mode
    let cap = new webdriver.Capabilities(webdriver.Capabilities.firefox());
    cap.setAcceptInsecureCerts(true);
    let profile = new firefox.Options();
    //add proxy
    //profile.setBinary('usr/bin/firefox');
    profile.setBinary(firefox.Channel.RELEASE);
    profile.headless();
    profile.setPreference('network.proxy.type', 1);
    profile.setPreference('network.proxy.http', zap_host);
    profile.setPreference('network.proxy.http_port', zap_port);
    profile.setPreference('network.proxy.ssl', zap_host);
    profile.setPreference('network.proxy.ssl_port', zap_port);
    profile.setPreference('network.proxy.no_proxies_on', '');
    //profile.setPreference('security.enterprise_roots.enabled', true);
    //profile.setPreference('media.gmp-manager.cert.checkAttributes', false);
    //profile.setPreference('acceptUntrustedCertificates', true);
    //profile.setPreference('acceptUntrustedCertificateIssuer', true);


    //options.setBinary(binary);
    //create a new WebDriver instance based on the builder's current configuration
    mod.driver = new webdriver.Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(profile)
        .withCapabilities(cap)
        .build();
    mod.By = webdriver.By;
    return mod;
  },
  startFunc: null,
  waitForZAP: function(zap_host,zap_port,callback) {
    let driver = mod.driver;
    var zap_url = 'http://' + zap_host + ':' + zap_port;
    console.log("Trying to reach OWASP ZAP on " + zap_url)
    mod.startFunc = callback;
    driver.get(zap_url).then(
       function() {
        console.log("Opened Zap API");
        driver.getTitle().then(
          async function(title){
            if(title.includes('ZAP API UI')) {
              console.log('ZAP startup complete');            
              mod.startFunc();
            } else {
              console.log('Title does not match: ' + title);
              await mod.sleep(5000);
              mod.waitForZAP(zap_host, zap_port,mod.startFunc);
            }
          }
        )
      },
      //keyword async has to be used in combination with "await"
      async function() {
        console.log("Waiting for ZAP startup...");
        //setTimeout(mod.waitForZAP(zap_host,zap_port,brigs_url,mod.startFunc), 5000, zap_host, zap_port, brigs_url, mod.startFunc)
        await mod.sleep(5000)
        console.log("Check again");
        mod.waitForZAP(zap_host,zap_port,mod.startFunc);
      }
    )
  }
}

module.exports = mod
