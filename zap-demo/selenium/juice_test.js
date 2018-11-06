const OWASP_ZAP_HOST = 'zap'
const OWASP_ZAP_PORT = 8080
const JUICE_URL = 'http://juice:3000'
const lib = require('./juice_lib').init(OWASP_ZAP_HOST, OWASP_ZAP_PORT)
const driver = lib.driver
const By = lib.By
const fs = require('fs');
var progress_scan = 0

function browse_shop() {
  driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/JSON/core/action/excludeFromProxy/?zapapiformat=JSON&formMethod=GET&regex=^(?!.*juice).*$')
  .then(() => driver.get(JUICE_URL))
  .then(() => driver.getTitle())
  .then((title) => console.log('Welcome to ' + title))
  .then(() => {
    driver.get(JUICE_URL + '/#/login')
    console.log('Exploring the application...')
  })
  .then(() => driver.sleep(2000))
  .then(() => driver.findElement(By.id("userEmail")).sendKeys("' UNION SELECT * FROM USERS"))
  .then(() => driver.findElement(By.id("userPassword")).sendKeys("123"))
  .then(() => driver.findElement(By.id("loginButton")).click())
  .then(() => {
    console.log('Starting active scan')
    driver.sleep(2000)
  })
  .then(() => driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/JSON/ascan/action/scan/?zapapiformat=JSON&formMethod=GET&url=' + encodeURI(JUICE_URL) + '&recurse=&inScopeOnly=&scanPolicyName=&method=&postData=&contextId='))
  .then(async () => {
      while(progress_scan < 100) {
        prom = driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + "/JSON/ascan/view/status/?zapapiformat=JSON&scanId=0")
          .then(() => driver.getPageSource())
          .then(() => driver.findElement(By.id('json')))
          .then((elem) => elem.getText())
          .then((txt) => {
            jsn = JSON.parse(txt);
            progress_scan = parseInt(jsn.status);
            console.log('Active scan ' + progress_scan + '% complete...');
          })
          await lib.sleep(5000);
      }
  })
  .then(() => driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/OTHER/core/other/htmlreport/?formMethod=GET'))
  .then(() => driver.getPageSource())
  .then((src) => fs.writeFile('/tests/report.html', src, (err) => {
    if (err) console.log(err)
    else console.log('Saved report.')
  }))
  .catch((err) => console.log('An error occured: ' + err))

}

lib.waitForZAP(OWASP_ZAP_HOST, OWASP_ZAP_PORT, browse_shop)
