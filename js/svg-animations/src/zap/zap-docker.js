import { zapDocker as cfg } from '../config/index.js';
import { bisRed } from '../bis-colors.js';

export const drawZapDocker = (snap) => {
    const path = snap.path(`M ${cfg.start.x},${cfg.start.y}
        L ${cfg.first.x},${cfg.first.y}
        L ${cfg.second.x},${cfg.second.y}
        L ${cfg.stop.x},${cfg.stop.y} z`);
    path.attr({
        fill: 'rgba(213, 56, 104, 0.125)',
        stroke: bisRed
    });

    const txt =  snap.text(cfg.first.x + (cfg.second.x - cfg.first.x)/2, cfg.first.y - 30,  'Docker');
    console.log('cfg.first.x + (cfg.second.x - cfg.first.x)/2', cfg.first.x + (cfg.second.x - cfg.first.x)/2);
    txt.attr({
        id: 'zap-docker-text',
        textLength: cfg.stop.x - cfg.first.x - 45,
        stroke: '#383232',
        fill: 'rgba(192, 192, 192, 0.5)',
        textAnchor: 'middle',
        style: 'font-size: 20px; font-weight:bold; text-anchor:middle;',
        transform: `rotate(-30 ${cfg.first.x + (cfg.second.x - cfg.first.x)/2 - 30} ${cfg.first.y - 30})`
    });

    const zapDockGroup = snap.g(path, txt);
    zapDockGroup.attr({
        id: 'zap-docker',
        style: 'display:none'
    });
    return zapDockGroup;
};

