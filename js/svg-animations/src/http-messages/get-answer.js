import { svg as svgCfg, getBrSrvAnswerRect as rectCfg, getBrSrvAnswerText as textCfg } from '../config/index.js';

const num = 0;

export const drawGetAnswer = (snap) => {
    const getRect = snap.rect(rectCfg.x, rectCfg.y, rectCfg.width, rectCfg.height - 10);
    getRect.attr({
        rx: 4,
        ry: 4,
        stroke: 'silver',
        fill: 'white',
        "stroke-width": 3
    });

    const txt1 = snap.text(rectCfg.x + 5, rectCfg.y + 15, '<html><head>...');

    txt1.attr({
        fill: 'darkgreen',
        'style': `font-size: 12px`
    });

    const txt2 = snap.text(rectCfg.x + 5, rectCfg.y + 15, '...<body></html>');
    txt2.attr({
        dy: '18px',
        fill: 'darkgreen',
        'style': `font-size: 12px;`
    });

    
    const group = snap.g(getRect, txt1, txt2);
    group.attr({
        style: 'display:none'
    });
    return group;
};