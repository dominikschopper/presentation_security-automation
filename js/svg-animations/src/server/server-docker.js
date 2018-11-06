import { serverDocker as cfg } from '../config/index.js';
import { bisBlue } from '../bis-colors.js';

export const drawServerDocker = (snap) => {
    const path = snap.path(`M ${cfg.start.x},${cfg.start.y}
        L ${cfg.first.x},${cfg.first.y}
        L ${cfg.second.x},${cfg.second.y}
        L ${cfg.stop.x},${cfg.stop.y} z`);
    path.attr({
        fill: 'rgba(50, 104, 158, 0.125)',
        stroke: bisBlue
    });

    const txt =  snap.text(cfg.first.x + (cfg.second.x - cfg.first.x)/2, cfg.first.y - 30,  'Docker');
    txt.attr({
        id: 'server-docker-text',
        'textLength': cfg.stop.x - cfg.first.x - 20,
        stroke: '#323238',
        "textAnchor": 'middle',
        fill: 'silver',
        style: 'font-size: 18px; font-weight: bold;text-anchor:middle;background-color: silver',
        transform: `rotate(-30 ${cfg.first.x + (cfg.second.x - cfg.first.x)/2 - 30} ${cfg.first.y - 30})`
    });

    const srvDockGroup = snap.g(path, txt);
    srvDockGroup.attr({
        id: 'server-docker-group',
        style: 'display:none'
    });

    return srvDockGroup;
};

