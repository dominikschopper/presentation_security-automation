import { 
    browserServerArrow as brsSrvcfg, 
    browserZapArrow as brsZapCfg, 
    zapServerArrow as zapSrvCfg,
    zapToReportArrow as zRepCfg
} from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


export const drawArrow = (snap) => {
    const browserServer = snap.path(`
        M ${brsSrvcfg.start.x},${brsSrvcfg.start.y}
        L ${brsSrvcfg.first.x},${brsSrvcfg.first.y}
        L ${brsSrvcfg.second.x},${brsSrvcfg.second.y}
        L ${brsSrvcfg.stop.x},${brsSrvcfg.stop.y}
    `);

    browserServer.attr({
        id: 'client-to-server',
        fill: 'transparent',
        class: 'anim-line',
        stroke: bisGreen,
        "stroke-width": 4
    });

    const serverBrowser = snap.path(`
        M ${brsSrvcfg.stop.x+15},${brsSrvcfg.stop.y}
        L ${brsSrvcfg.second.x+15},${brsSrvcfg.first.y+15}
        L ${brsSrvcfg.first.x-15},${brsSrvcfg.first.y+15}
        L ${brsSrvcfg.start.x-15},${brsSrvcfg.start.y}
    `);

    serverBrowser.attr({
        id: 'server-to-client',
        class: 'anim-line',
        fill: 'transparent',
        stroke: bisBlue,
        "stroke-width": 4
    });

    const browserZap = snap.path(`
        M ${brsZapCfg.start.x+15},${brsZapCfg.start.y}
        L ${brsZapCfg.first.x+15},${brsZapCfg.first.y+15}
        L ${brsZapCfg.second.x-15},${brsZapCfg.second.y+15}
        L ${brsZapCfg.stop.x-15},${brsZapCfg.stop.y}
    `);

    browserZap.attr({
        id: 'client-to-zap',
        class: 'anim-line',
        fill: 'transparent',
        stroke: bisGreen,
        "stroke-width": 4
    });

    const zapServer = snap.path(`
        M ${zapSrvCfg.start.x+15},${zapSrvCfg.start.y}
        L ${zapSrvCfg.first.x+15},${zapSrvCfg.first.y+15}
        L ${zapSrvCfg.second.x-15},${zapSrvCfg.second.y+15}
        L ${zapSrvCfg.stop.x-15},${zapSrvCfg.stop.y}
    `);

    zapServer.attr({
        id: 'zap-to-server',
        class: 'anim-line',
        fill: 'transparent',
        stroke: bisRed,
        "stroke-width": 4
    });


    const serverZap = snap.path(`
        M ${zapSrvCfg.stop.x},${zapSrvCfg.stop.y}
        L ${zapSrvCfg.second.x},${zapSrvCfg.second.y+30}
        L ${zapSrvCfg.first.x},${zapSrvCfg.first.y+30}
        L ${zapSrvCfg.start.x},${zapSrvCfg.start.y}
    `);

    serverZap.attr({
        id: 'server-to-zap',
        class: 'anim-line',
        fill: 'transparent',
        stroke: bisBlue,
        "stroke-width": 4
    });


    const zapBrowser = snap.path(`
        M ${brsZapCfg.stop.x},${brsZapCfg.stop.y}
        L ${brsZapCfg.second.x},${brsZapCfg.second.y+30}
        L ${brsZapCfg.first.x},${brsZapCfg.first.y+30}
        L ${brsZapCfg.start.x},${brsZapCfg.start.y}
    `);

    zapBrowser.attr({
        id: 'zap-to-browser',
        class: 'anim-line',
        fill: 'transparent',
        stroke: bisRed,
        "stroke-width": 4
    });

    const zapReportArrow = snap.line(zRepCfg.x1, zRepCfg.y1, zRepCfg.x2, zRepCfg.y2);
    zapReportArrow.attr({
        stroke: bisOrange,
        style: 'display:none',
        id: 'zap-report-arrow'
    });
    zapReportArrow.attr({"stroke-width": 8});

    return [browserServer, serverBrowser, browserZap, zapServer];
};