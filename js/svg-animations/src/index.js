console.log('starting');
import { drawBrowser } from './browser/browser.js';
import { drawServer } from './server/server.js';
import { drawArrow as drawBrowserServerArrow } from './arrows/browser-server.js';
import { drawGet as drawBrowserServerGet } from "./http-messages/get-server.js";
import {drawGetAnswer as drawGetBrsSrvAnswer} from './http-messages/get-answer.js';
import { drawReport } from './report/report.js';
import { drawZap } from './zap/zap.js';
import { drawBrowserDocker } from './browser/browser-docker.js';
import { drawServerDocker } from './server/server-docker.js';
import { drawZapDocker } from './zap/zap-docker.js';
import { drawSeleniumLogo } from './browser/selenium-logo.js';
import { drawRestImage } from "./zap/rest-image.js";

const snap = Snap('#zap-aninmation');

const browser = drawBrowser(snap);
const seleniumLogo = drawSeleniumLogo(snap);

const server = drawServer(snap);

const arrow = drawBrowserServerArrow(snap);
const zapObjs = drawZap(snap);
const zap = zapObjs.zap;
const zapIcon = zapObjs.zapIcon;
const zapRestImage = drawRestImage(snap);

const getServerRequest1 = drawBrowserServerGet(snap);
getServerRequest1.attr({ id: 'request-1' });

const getServerRequest2 = drawBrowserServerGet(snap);
getServerRequest2.attr({ id: 'request-2' })

const getServerAnswer1 = drawGetBrsSrvAnswer(snap);
getServerAnswer1.attr({id: 'response-1'});

const getServerAnswer2 = drawGetBrsSrvAnswer(snap);
getServerAnswer2.attr({id: 'response-2'});

const getServerAnswer3 = drawGetBrsSrvAnswer(snap);
getServerAnswer3.attr({ id: 'response-3'});

const seleniumDocker = drawBrowserDocker(snap);
const zapDocker = drawZapDocker(snap);
const serverDocker = drawServerDocker(snap);

const report = drawReport(snap);

export {
    browser as svgBrowser,
    server as svgServer,
    getServerRequest1 as getReq1,
    getServerRequest2 as getReq2,
    getServerAnswer1 as getAnsw1,
    getServerAnswer2 as getAnsw2,
    getServerAnswer3 as getAnsw3,
    zap,
    zapIcon,
    report as svgReport,
    seleniumDocker,
    serverDocker,
    zapDocker,
    seleniumLogo,
    zapRestImage
}
