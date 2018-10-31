import { svg as svgCfg, report as repCfg, reportLines as rlCfg } from '../config/index.js';

import { bisRed, bisGreen, bisOrange, bisBlue } from "../bis-colors.js";


export const drawReport = (snap) => {

    const rect = snap.rect(repCfg.x, repCfg.y + 80, repCfg.width, repCfg.height);
    rect.attr({
        fill: 'white',
    });

    const lines = rlCfg.map((cfg) => {
        const l = snap.line(cfg.x1, cfg.y1, cfg.x2, cfg.y1);
        return l;
    });


    const group = snap.g(rect, lines[0], lines[1], lines[2]);
    group.attr({
        stroke: bisOrange,
        style: 'display:none'
    });
    group.attr({
        "stroke-width": 3
    })

    return group;
};