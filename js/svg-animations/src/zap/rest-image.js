import { zapDocker as cfg } from '../config/index.js';

export const drawRestImage = (snap) => {

    const imgWidth = cfg.stop.x - cfg.start.x - 65;
    const imgHeight = cfg.first.y - cfg.start.y - 90;
    const img = snap.image('images/rest-api-logo.jpg', cfg.start.x + 22, cfg.start.y + 20, imgWidth, imgHeight);
    img.attr({
        opacity: 0.75,
        style: 'display:none'
    });
    return img;
};
