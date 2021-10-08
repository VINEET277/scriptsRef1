const tilestrata = require('tilestrata');
const mapnik = require('tilestrata-mapnik');

const strata = tilestrata();

strata.layer('basemapp')
    .route('basemap.png')

strata.listen(8080, function(err) {
    if (err) throw err;
    console.log('Listening on port 8080...');
});