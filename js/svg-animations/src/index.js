console.log('starting');
import { drawBrowser } from './browser/browser.js';
import { drawServer } from './server/server.js';
import { drawArrow as drawBrowserServerArrow } from './arrows/browser-server.js';
import { drawGet as drawBrowserServerGet } from "./http-messages/get-server.js";
import {drawGetAnswer as drawGetBrsSrvAnswer} from './http-messages/get-answer.js';
import { drawReport } from './report/report.js';
import { drawZap } from './zap/zap.js';
// import { browser as browserCfg } from './config/index.js';

const snap = Snap('#zap-aninmation');

const browser = drawBrowser(snap);
const server = drawServer(snap);

const arrow = drawBrowserServerArrow(snap);
const zapObjs = drawZap(snap);

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

const report = drawReport(snap);

window.svgBrowser = browser;
window.svgServer = server;
window.getReq1 = getServerRequest1;
window.getReq2 = getServerRequest2;
window.getAnsw1 = getServerAnswer1;
window.getAnsw2 = getServerAnswer2;
window.getAnsw3 = getServerAnswer3;
window.zap = zapObjs.zap;
window.zapIcon = zapObjs.zapIcon;
window.svgReport = report;
// console.log('arrow (%o)', arrow);
