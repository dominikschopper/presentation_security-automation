import { browserDocker as cfg } from '../config/index.js';

export const drawSeleniumLogo = (snap) => {

    const imgWidth = cfg.stop.x - cfg.start.x - 60;
    const imgHeight = cfg.first.y - cfg.start.y - 80;
    const img = snap.image('images/selenium-logo.png', cfg.start.x + 28, cfg.start.y + 10, imgWidth, imgHeight);
    img.attr({
        opacity: 0.75,
        style: 'display:none'
    });
    return img;
};

