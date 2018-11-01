import { browser as browserCfg, browserText as textCfg, svg } from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


export const drawBrowser = (snap) => {
    const browserRect = snap.rect(browserCfg.x, browserCfg.y, browserCfg.width, browserCfg.height);
    browserRect.attr({
        rx: 4,
        ry: 4,
        stroke: bisGreen,
        fill: 'white',
        style: 'stroke-width:2px'
    });
    const txt =  snap.text(textCfg.x, textCfg.y,  'browser');
    txt.attr({
        'textLength': '100',
        stroke: bisGreen,
        style: `font-size: 22px`
    });

    const browserGroup = snap.g(browserRect, txt);
    browserGroup.attr({
        style: 'display:none',
        id: 'svg-browser'
    });

    return browserGroup;
};