import { svg as svgCfg, server as serverCfg, serverText as textCfg } from '../config/index.js';

export const drawServer = (snap) => {
    const serverRect = snap.rect(serverCfg.x, serverCfg.y, serverCfg.width, serverCfg.height);
    serverRect.attr({
        rx: 4,
        ry: 4,
        stroke: 'orange',
        fill: 'white'
    });
    const txt = snap.text(textCfg.x, textCfg.y, 'server');
    txt.attr({
        'textLength': '100',
        style: 'stroke-width:12px;font-size: 22px'
    });

    const serverGroup = snap.g(serverRect, txt);
    serverGroup.attr({
        style: 'display:none',
        id: 'svg-server'
    });
    return serverGroup;
};