const OWASP_ZAP_HOST = 'zap'
const OWASP_ZAP_PORT = 8080
const JUICE_URL = 'http://juice:3000'

const lib = require('./juice_lib')
    .init(OWASP_ZAP_HOST, OWASP_ZAP_PORT)

const driver = lib.driver
const By = lib.By
const fs = require('fs');


const padWith0= (str) => {
    if (str.length < 2) {
        str = str.padStart(2, '0');
    }
    return str;
};
/** @param {Date} now */
const createDateString = (now) => {
    const dateparts = [
        now.getFullYear(),
        now.getMonth()+1, 
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ];
    const paddedDates = dateparts.map((d) => padWith0(d.toString()))
    const [y, m, d, h, i, s] = paddedDates
    return `${y}${m}${d}-${h}${i}${s}`;
};

const now = new Date();
const datetime = createDateString(now);

console.log("===== starting active scan with ZAP");
console.time('activescan');

let progress_scan = 0;
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
        .then(() => driver.findElement(By.id("email")).sendKeys("admin@juice-sh.op"))
        .then(() => driver.findElement(By.id("password")).sendKeys("admin123"))
        .then(() => driver.findElement(By.id("loginButton")).click())
        .then(() => driver.sleep(500))
        .then(() => driver.findElement(By.className("logo")).click())
        .then(() => driver.findElement(By.xpath('/html/body/app-root/div/mat-sidenav-container/mat-sidenav-content/app-search-result/div/div/mat-table/mat-row[1]/mat-cell[1]/img')).click())
        .then(() => driver.findElement(By.className('cdk-textarea-autosize')).sendKeys(`selenium review ${datetime}`))
        .then(() => {
            console.log('Starting active scan')
            driver.sleep(2000)
        })
        .then(() => driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/JSON/ascan/action/scan/?zapapiformat=JSON&formMethod=GET&url=' + encodeURI(JUICE_URL) + '&recurse=&inScopeOnly=&scanPolicyName=&method=&postData=&contextId='))
        .then(async () => {
            while (progress_scan < 100) {
                driver.
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
        .then((src) => fs.writeFile(`/tests/report-${datetime}.html`, src, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Saved report.');
            }
        }))
        // .then(() => driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/OTHER/core/other/jsonreport/?formMethod=GET'))
        // .then(() => driver.getPageSource())
        // .then((src) => {
        //     console.dir('>>>>', src);
        //     return fs.writeFile(`/tests/report-${datetime}.json`, src, (err) => {
        //         // src.then(() => driver.findElement(By.id('json')))
        //         //     .then((elem) => elem.getText())
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log('Saved report.');
        //         }
        //         console.timeEnd('activescan')
        //     });
        // })
        .catch((err) => console.log('An error occured: ' + err))

}

lib.waitForZAP(OWASP_ZAP_HOST, OWASP_ZAP_PORT, browse_shop)