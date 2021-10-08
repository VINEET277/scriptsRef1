const { resolve } = require('path');
const opentype = require('opentype.js');

const font = opentype.loadSync(resolve(__dirname, 'symbol.ttf'));

const path = font.getPath('Hello, World!', 0, 150, 72);
    console.log(path);