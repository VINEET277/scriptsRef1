import cheerio from 'cheerio';
import { readdirSync, readFileSync, createWriteStream } from 'fs';
import { format } from '@fast-csv/format';
import { resolve } from 'path';

let folder = 'D:/REPORTS/';

const stream = format({
    quote: "'",
    headers: ['Point', 'X', 'Y', 'Z', 'Code', 'Method', 'MethodType', 'Searchclass', 'Antennaheight', 'AntennaType', 'HzPrec', 'VtPrec', 
    'Satellites', 'PDOP', 'HDOP', 'VDOP', 'Basedataage', 'RMS', 'Positionsused', 
    'VCVxx', 'VCVxy', 'VCVxz', 'VCVyy', 'VCVyz', 'VCVzz']
});

let csvstream = createWriteStream('D:/reports.csv');
stream.pipe(csvstream);

let htms = readdirSync(folder);
for (let i = 0; i < htms.length; i++){
    let filePath = resolve(folder, htms[i]);

    let htmlStr = readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(htmlStr);

    let allTableElements = $('table');

    // let j = 0;
    for (let i = 0; i < allTableElements.length; i++){
        let el = allTableElements[i];
        let tableEl = $(el);
        let content = tableEl.text();

        if (content.includes('QC 1') && content.includes('QC 2')){
            // console.log(content);
        
            let row1            = $(tableEl.children().children()[0]);
            let Point           = $(row1.children()[1]).text();
            let X               = $(row1.children()[3]).text();
            let Y               = $(row1.children()[5]).text();
            let Z               = $(row1.children()[7]).text();
            let Code            = $(row1.children()[9]).text();

            let row2            = $(tableEl.children().children()[1]);
            let Method          = $(row2.children()[3]).text();
            let Type            = $(row2.children()[5]).text();
            let SearchClass     = $(row2.children()[7]).text();

            let row3            = $(tableEl.children().children()[2]);
            let AntennaHeight   = $(row3.children()[1]).text();
            let AntennaType     = $(row3.children()[3]).text();
            let HzPrec          = $(row3.children()[5]).text();
            let VtPrec          = $(row3.children()[7]).text();

            let row4            = $(tableEl.children().children()[3]);
            let Satellites      = $(row4.children()[3]).text();
            let PDOP            = $(row4.children()[5]).text();
            let HDOP            = $(row4.children()[7]).text();
            let VDOP            = $(row4.children()[9]).text();

            let row5            = $(tableEl.children().children()[4]);
            let Basedataage     = $(row5.children()[3]).text();
            let RMS             = $(row5.children()[5]).text();
            let Positionsused   = $(row5.children()[7]).text();

            let row6            = $(tableEl.children().children()[5]);
            let VCVxx           = $(row6.children()[3]).text();
            let VCVxy           = $(row6.children()[5]).text();
            let VCVxz           = $(row6.children()[7]).text();

            let row7            = $(tableEl.children().children()[6]);
            let VCVyy           = $(row7.children()[5]).text();
            let VCVyz           = $(row7.children()[7]).text();

            let row8            = $(tableEl.children().children()[7]);
            let VCVzz           = $(row8.children()[7]).text();

            // console.log(Point, X, Y, Z, Code);
            // console.log(Method, Type, SearchClass);
            // console.log(AntennaHeight, AntennaType, HzPrec, VtPrec);
            // console.log(Satellites, PDOP, HDOP, VDOP);
            // console.log(Basedataage, RMS, Positionsused);
            // console.log(VCVxx, VCVxy, VCVxz, VCVyy, VCVyz, VCVzz);

            let csvRow = [
                Point, X, Y, Z, Code, Method, Type, SearchClass, AntennaHeight, AntennaType, HzPrec, VtPrec,
                Satellites, PDOP, HDOP, VDOP, Basedataage, RMS, Positionsused,
                VCVxx, VCVxy, VCVxz, VCVyy, VCVyz, VCVzz
            ];
            
            // console.log(csvRow);

            stream.write(csvRow);

            // j++;
        }

        // if (j == 1) break;
    }

    console.log(filePath, 'Done...');
}

stream.end();
