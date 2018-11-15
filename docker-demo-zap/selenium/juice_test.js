const OWASP_ZAP_HOST = 'zap';
const OWASP_ZAP_PORT = 8080;
const JUICE_URL = 'http://juice:3000';

const lib = require('./juice_lib').init(OWASP_ZAP_HOST, OWASP_ZAP_PORT);
const driver = lib.driver;
const By = lib.By;
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

function browse_shop() {
    console.log('==== starting simple selenium clickpath');
    console.time('selenium-simple');
    driver.get('http://' + OWASP_ZAP_HOST + ':' + OWASP_ZAP_PORT + '/JSON/core/action/excludeFromProxy/?zapapiformat=JSON&formMethod=GET&regex=^(?!.*juice).*$')
        .then(() => driver.get(JUICE_URL))
        .then(() => driver.getTitle())
        .then((title) => console.log('Welcome to ' + title))
        .then(() => {
            driver.get(JUICE_URL + '/#/login')
            console.log('Exploring the application...')
        })
        .then(() => driver.sleep(2000))
        .then(() => driver.findElement(By.id("email")).sendKeys("' UNION SELECT * FROM USERS"))
        .then(() => driver.findElement(By.id("password")).sendKeys("123"))
        .then(() => driver.findElement(By.id("loginButton")).click())
        .then(() => {
            console.log('Starting active scan')
            driver.sleep(2000)
        })
        .then((src) => fs.writeFile(`/tests/report-${datetime}.html`, src, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Saved report.');
            }
            console.timeEnd('selenium-simple');
        }))
        .catch((err) => console.log('An error occured: ' + err))

}

lib.waitForZAP(OWASP_ZAP_HOST, OWASP_ZAP_PORT, browse_shop)