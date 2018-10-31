import { svg as svgCfg, server as serverCfg, serverText as textCfg } from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


export const drawServer = (snap) => {
    const serverRect = snap.rect(serverCfg.x, serverCfg.y, serverCfg.width, serverCfg.height);
    serverRect.attr({
        rx: 4,
        ry: 4,
        fill: 'white'
    });
    const txt = snap.text(textCfg.x, textCfg.y, 'server');
    txt.attr({
        'textLength': '100',
        stroke: bisBlue,
        style: 'font-size: 22px'
    });

    const serverGroup = snap.g(serverRect, txt);
    serverGroup.attr({
        stroke: bisBlue,
        style: 'display:none',
        id: 'svg-server'
    });
    return serverGroup;
};