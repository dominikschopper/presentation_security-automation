import { browserDocker as cfg } from '../config/index.js';
import { bisGreen } from '../bis-colors.js';

export const drawBrowserDocker = (snap) => {
    const path = snap.path(`M ${cfg.start.x},${cfg.start.y}
        L ${cfg.first.x},${cfg.first.y}
        L ${cfg.second.x},${cfg.second.y}
        L ${cfg.stop.x},${cfg.stop.y} z`);
    path.attr({
        fill: 'rgba(50, 158, 152, 0.125)',
        stroke: bisGreen
    });
    
    const txt =  snap.text(cfg.first.x + (cfg.second.x - cfg.first.x)/2, cfg.first.y - 30,  'Docker');
    txt.attr({
        // id: 'browser-docker-text',
        stroke: '#323832',
        textLength: cfg.stop.x - cfg.first.x - 45,
        fill: 'silver',
        style: 'font-size: 18px; font-weight: bold;text-anchor:middle;',
        transform: `rotate(-30 ${cfg.first.x + (cfg.second.x - cfg.first.x)/2 - 30} ${cfg.first.y - 30})`
    });

    const brDockGroup = snap.g(path, txt);
    brDockGroup.attr({
        id: 'browser-docker',
        style: 'display:none'
    });
    return brDockGroup;
};

