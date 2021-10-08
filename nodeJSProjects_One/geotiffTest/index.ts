import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import { readFileSync } from 'fs';

let tifffile = 'D:/GIS/tile-5-12.tif';

let j = readFileSync(tifffile);
console.log(j);
