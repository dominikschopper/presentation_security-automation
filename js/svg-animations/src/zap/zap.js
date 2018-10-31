import {
    svg as svgCfg,
    zap as zapCfg,
    zapText as textCfg
} from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


export const drawZap = (snap) => {
    const zapRect = snap.rect(zapCfg.x, zapCfg.y, zapCfg.width, zapCfg.height);
    zapRect.attr({
        id: 'zap-rect',
        rx: 4,
        ry: 4,
        stroke: bisRed,
        fill: 'rgba(213, 56, 104, 0.33333)',
        style: 'stroke-width:4px;'
    });

    const txt = snap.text(textCfg.x, textCfg.y, 'ZAP');
    txt.attr({
        id: 'zap-txt',
        textLength: '100',
        style: 'font-size: 26px;'
    });

    const zapIcon = snap.image('/images/zap_128x128.png', zapCfg.x + 30, zapCfg.y + 67, 50, 50);

    const group = snap.g(zapRect, txt, zapIcon);
    group.attr({id: 'zap-group'});
    group.attr({style: 'display:none'});

    zapIcon.attr({ id: 'zap-icon' });

    return {zap: group, zapIcon: zapIcon};
};
