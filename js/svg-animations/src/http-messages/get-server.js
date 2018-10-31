import { svg as svgCfg, getBrSrvRect as rectCfg, getBrSrvRectText as textCfg } from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


const num = 0;

export const drawGet = (snap) => {
    const getRect = snap.rect(rectCfg.x, rectCfg.y, rectCfg.width, rectCfg.height - 10);
    getRect.attr({
        rx: 4,
        ry: 4,
        stroke: bisGreen,
        fill: 'white',
        "stroke-width": 3
    });

    const txt1 = snap.text(rectCfg.x + 5, rectCfg.y + 15, 'GET / HTTP/1.1');

    txt1.attr({
        fill: bisGreen,
        'style': `font-size: 12px`
    });

    const txt2 = snap.text(rectCfg.x + 5, rectCfg.y + 15, 'Host: me.com');
    txt2.attr({
        dy: '18px',
        fill: bisGreen,
        'style': `font-size: 12px;`
    });

    
    const group = snap.g(getRect, txt1, txt2);

    group.attr({
        style: 'display:none'
    });

    return group;
};