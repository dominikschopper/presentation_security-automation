
const  cRed = '#d53868';
const  cOrange = '#d59e38';
const  cGreen = '#329e98';
const cBlue = '#32689e';

export const svg = {
    height: 600,
    width: 800,
    border: 40,
    elements: {
        width: 120
    },
    strokeWidth: 9
};

export const browser = {
    height: 120,
    width: svg.elements.width,
    x: svg.border,
    y: svg.border
};

export const browserText = {
    x: svg.border + 10,
    y: browser.height / 2 + svg.border + 5
};

export const server = {
    height: 200,
    width: svg.elements.width,
    x: (svg.width - svg.border - svg.elements.width),
    y: svg.border
};
export const serverText = {
    x: svg.width - 30 - server.width,
    y: server.height / 2 + svg.border + 5
};

export const zap = {
    x: svg.width/2 - svg.elements.width/2,
    y: svg.border,
    width: svg.elements.width,
    height: 120
};

export const zapText = {
    x: zap.x + 10,
    y: zap.height / 2 + svg.border + 5
}

export const report = {
    x: zap.x + zap.width / 2,
    y: zap.y - 30,
    height: 60,
    width: 48,
    border: 4
};

const lineLength = report.width - (report.border * 2);
const lineStart = report.x + report.border;

export const reportLines = [
    { x1: lineStart, y1: report.y + 98, x2: report.x + lineLength },
    { x1: lineStart, y1: report.y + 110, x2: report.x + lineLength },
    { x1: lineStart, y1: report.y + 122, x2: report.x + lineLength },
    { x1: lineStart, y1: report.y + 134, x2: report.x + lineLength }
];


export const zapToReportArrow = {
    x1: report.x + report.width / 2,
    y1: report.y + report.height,
    x2: report.x + report.width / 2,
    y2: report.y + report.height + 120
}

export const browserServerArrow = {
    start:  { x: (browser.width/2 + svg.border), y: (svg.border + browser.height + 15) },
    first:  { x: (browser.width/2 + svg.border), y: (svg.border + browser.height + 150) },
    second: { x: (server.x + server.width/2), y: (svg.border + browser.height + 150) },
    stop:   { x: (server.x + server.width/2), y: (svg.border + server.height + 15) }
}


export const browserZapArrow = {
    start:  { x: (browser.width/2 + svg.border), y: (svg.border + browser.height + 15) },
    first:  { x: (browser.width/2 + svg.border), y: (svg.border + browser.height + 150) },
    second: { x: (zap.x + zap.width/2 - 15), y: (svg.border + zap.height + 150) },
    stop:   { x: (zap.x + zap.width/2 - 15), y: (svg.border + zap.height + 15) }
}


export const zapServerArrow = {
    start:  { x: (zap.x + zap.width/2 + 15), y: (svg.border + zap.height + 15) },
    first:  { x: (zap.x + zap.width/2 + 15), y: (svg.border + zap.height + 150) },
    second: { x: (server.x + server.width/2), y: (svg.border + browser.height + 150) },
    stop:   { x: (server.x + server.width/2), y: (svg.border + server.height + 15) }
}

export const getBrSrvRect = {
    x: browserServerArrow.start.x,
    y: browserServerArrow.start.y - svg.elements.width / 4,
    width: svg.elements.width - 25,
    height: svg.elements.width / 2
};

export const getBrSrvRectText = {
    inlineSize: svg.elements.width - 25,
    x: getBrSrvRect.x + 5,
    y: getBrSrvRect.y + 15
}

export const getBrSrvAnswerRect = {
    x: browserServerArrow.stop.x,
    y: browserServerArrow.stop.y - svg.elements.width / 4,
    width: svg.elements.width - 25,
    height: svg.elements.width / 2
};

export const getBrSrvAnswerText = {
    inlineSize: svg.elements.width - 25,
    x: getBrSrvAnswerRect.x + 5,
    y: getBrSrvAnswerRect.y + 15
}
