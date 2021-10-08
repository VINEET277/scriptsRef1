import cheerio from 'cheerio';
import { readFileSync, createWriteStream } from 'fs';
import { format } from '@fast-csv/format';

let filePath = 'D:/REPORTS/9A_Survey Report.html';

let htmlStr = readFileSync(filePath, 'utf-8');
const $ = cheerio.load(htmlStr);

let allTableElements = $('table');

const stream = format({
    quote: "'",
    headers: ['Point', 'X', 'Y', 'Z', 'Code', 'Method', 'MethodType', 'Searchclass', 'Antennaheight', 'AntennaType', 'HzPrec', 'VtPrec', 
    'Satellites', 'PDOP', 'HDOP', 'VDOP', 'Basedataage', 'RMS', 'Positionsused', 
    'VCVxx', 'VCVxy', 'VCVxz', 'VCVyy', 'VCVyz', 'VCVzz']
});
let csvstream = createWriteStream('D:/report1.csv');
stream.pipe(csvstream);

let j = 0;
for (let i = 0; i < allTableElements.length; i++){
    let el = allTableElements[i];
    let cheerioEl = $(el);
    let content = cheerioEl.text();

    if (content.includes('QC 1') && content.includes('QC 2')){
        // console.log(content);
    
        let Point = content.split('Point')[1].split('X')[0].trim();

        let X, Y, Z;
        if (content.includes('IMAX') || content.includes('MAC')){
            X = content.split('ΔX')[1].split('ΔY')[0].trim();
            Y = content.split('ΔY')[1].split('ΔZ')[0].trim();
            Z = content.split('ΔZ')[1].split('Code')[0].trim();
        } else {
            X = content.split('X')[1].split('Y')[0].trim();
            Y = content.split('Y')[1].split('Z')[0].trim();
            Z = content.split('Z')[1].split('Code')[0].trim();
        }

        let Code = content.split('Code')[1].split('Method')[0].trim();
        let Method = content.split('Method')[1].split('Type')[0].trim();
        let MethodType = content.split('Type')[1].split('Search class')[0].trim();
        let Searchclass = content.split('Search class')[1].split('Antenna height')[0].trim();
        let Antennaheight = content.split('Antenna height')[1].split('Type')[0].trim();
        let AntennaType = content.split('Type')[2].split('Hz Prec (DRMS)')[0].trim();
        let HzPrec = content.split('Hz Prec (DRMS)')[1].split('Vt Prec (1 sigma)')[0].trim();
        let VtPrec = content.split('Vt Prec (1 sigma)')[1].split('QC 1')[0].trim();

        let Satellites = content.split('Satellites')[1].split('PDOP')[0].trim();
        let PDOP = content.split('PDOP')[1].split('HDOP')[0].trim();
        let HDOP = content.split('HDOP')[1].split('VDOP')[0].trim();
        let VDOP = content.split('VDOP')[1].split('Base data age')[0].trim();
        let Basedataage = content.split('Base data age')[1].split('RMS')[0].trim();
        let RMS = content.split('RMS')[2].split('Positions used')[0].trim();
        let Positionsused = content.split('Positions used')[1].split('QC 2')[0].trim();

        let VCVxx = content.split('VCV xx (m²)')[1].split('VCV xy (m²)')[0].trim();
        let VCVxy = content.split('VCV xy (m²)')[1].split('VCV xz (m²)')[0].trim();
        let VCVxz = content.split('VCV xz (m²)')[1].split('VCV yy (m²)')[0].trim();
        let VCVyy = content.split('VCV yy (m²)')[1].split('VCV yz (m²)')[0].trim();
        let VCVyz = content.split('VCV yz (m²)')[1].split('VCV zz (m²)')[0].trim();
        let VCVzz = content.split('VCV zz (m²)')[1].trim();

        // console.log(Point, X, Y, Z, Code, Method, MethodType, Searchclass, Antennaheight, AntennaType, HzPrec, VtPrec);
        // console.log(Satellites, PDOP, HDOP, VDOP, Basedataage, RMS, Positionsused);
        // console.log(VCVxx, VCVxy, VCVxz, VCVyy, VCVyz, VCVzz);

        
        let csvRow = [
            Point, X, Y, Z, Code, Method, MethodType, Searchclass, Antennaheight, AntennaType, HzPrec, VtPrec,
            Satellites, PDOP, HDOP, VDOP, Basedataage, RMS, Positionsused,
            VCVxx, VCVxy, VCVxz, VCVyy, VCVyz, VCVzz
        ];

        // console.log(csvRow);

        stream.write(csvRow);

        j++;
    }

    // if (j == 1) break;
}

stream.end();
