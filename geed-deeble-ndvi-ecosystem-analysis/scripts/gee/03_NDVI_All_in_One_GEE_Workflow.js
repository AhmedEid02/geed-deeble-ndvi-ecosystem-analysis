// =====================================================
// GEED DEEBLE FOREST RESERVE ECOSYSTEM
// ALL-IN-ONE GOOGLE EARTH ENGINE NDVI WORKFLOW
// Study years: 2000, 2008, 2016, 2024
// Season: MAM / Gu season
// Prepared by: Ahmed Hussein Ismail
// =====================================================

// 1. LOAD AOI
var aoi = ee.FeatureCollection('projects/research-paper-gabiley-ndvi/assets/Geed_deeble_reserv_Area');
Map.setOptions('SATELLITE');
Map.centerObject(aoi, 12);
Map.addLayer(aoi.style({color:'red', fillColor:'00000000', width:3}), {}, 'Geed Deeble Forest Reserve AOI');
print('AOI area ha:', aoi.geometry().area().divide(10000));
print('AOI centroid:', aoi.geometry().centroid());

// 2. SETTINGS
var startMonth = 3;
var endMonth = 5;
var seasonName = 'MAM_Gu';
var years = [2000, 2008, 2016, 2024];

// 3. CLOUD MASK
function maskLandsatC2(image) {
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(1 << 0).eq(0)
    .and(qa.bitwiseAnd(1 << 1).eq(0))
    .and(qa.bitwiseAnd(1 << 3).eq(0))
    .and(qa.bitwiseAnd(1 << 4).eq(0))
    .and(qa.bitwiseAnd(1 << 5).eq(0));
  return image.updateMask(mask);
}

// 4. SENSOR PREPARATION
function prepL57(image) {
  image = maskLandsatC2(image);
  var optical = image.select(['SR_B1','SR_B2','SR_B3','SR_B4','SR_B5','SR_B7'])
    .multiply(0.0000275).add(-0.2)
    .rename(['Blue','Green','Red','NIR','SWIR1','SWIR2']);
  var ndvi = optical.normalizedDifference(['NIR','Red']).rename('NDVI');
  return optical.addBands(ndvi).copyProperties(image, image.propertyNames());
}

function prepL89(image) {
  image = maskLandsatC2(image);
  var optical = image.select(['SR_B2','SR_B3','SR_B4','SR_B5','SR_B6','SR_B7'])
    .multiply(0.0000275).add(-0.2)
    .rename(['Blue','Green','Red','NIR','SWIR1','SWIR2']);
  var ndvi = optical.normalizedDifference(['NIR','Red']).rename('NDVI');
  return optical.addBands(ndvi).copyProperties(image, image.propertyNames());
}

function startDate(year) { return ee.Date.fromYMD(year, startMonth, 1); }
function endDate(year) { return ee.Date.fromYMD(year, endMonth, 1).advance(1, 'month'); }
function makeComposite(collection, year) {
  return collection.median().clip(aoi)
    .set('Year', year).set('Season', seasonName)
    .set('Image_Count', collection.size());
}

// 5. COMPOSITES
var l5_2000 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2').filterBounds(aoi).filterDate(startDate(2000), endDate(2000)).map(prepL57);
var l7_2008 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').filterBounds(aoi).filterDate(startDate(2008), endDate(2008)).map(prepL57);
var l8_2016 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterBounds(aoi).filterDate(startDate(2016), endDate(2016)).map(prepL89);
var l8_2024 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').filterBounds(aoi).filterDate(startDate(2024), endDate(2024)).map(prepL89);
var l9_2024 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2').filterBounds(aoi).filterDate(startDate(2024), endDate(2024)).map(prepL89);

var img2000 = makeComposite(l5_2000, 2000);
var img2008 = makeComposite(l7_2008, 2008);
var img2016 = makeComposite(l8_2016, 2016);
var img2024 = makeComposite(l8_2024.merge(l9_2024), 2024);

// 6. VISUALIZATION
var ndviVis = {min:0, max:0.6, palette:['8c510a','d8b365','f6e8c3','c7eae5','5ab4ac','01665e']};
Map.addLayer(img2000.select('NDVI'), ndviVis, 'NDVI 2000');
Map.addLayer(img2008.select('NDVI'), ndviVis, 'NDVI 2008');
Map.addLayer(img2016.select('NDVI'), ndviVis, 'NDVI 2016');
Map.addLayer(img2024.select('NDVI'), ndviVis, 'NDVI 2024');

// 7. CHANGE MAP
var ndviChange = img2024.select('NDVI').subtract(img2000.select('NDVI')).rename('NDVI_Change_2000_2024');
Map.addLayer(ndviChange, {min:-0.3, max:0.3, palette:['red','white','green']}, 'NDVI Change 2000-2024');

// 8. STATISTICS
function getStats(image, year) {
  var stats = image.select('NDVI').reduceRegion({
    reducer: ee.Reducer.mean().combine(ee.Reducer.min(), '', true).combine(ee.Reducer.max(), '', true).combine(ee.Reducer.stdDev(), '', true),
    geometry: aoi.geometry(), scale: 30, maxPixels: 1e13
  });
  return ee.Feature(null, {'Year':year, 'Season':seasonName, 'Image_Count':image.get('Image_Count'), 'Mean_NDVI':stats.get('NDVI_mean'), 'Min_NDVI':stats.get('NDVI_min'), 'Max_NDVI':stats.get('NDVI_max'), 'SD_NDVI':stats.get('NDVI_stdDev')});
}
var ndviStats = ee.FeatureCollection([getStats(img2000,2000), getStats(img2008,2008), getStats(img2016,2016), getStats(img2024,2024)]);
print('NDVI statistics:', ndviStats);

// 9. EXPORTS
Export.table.toDrive({collection: ndviStats, description:'Geed_Deeble_NDVI_Statistics_2000_2008_2016_2024', folder:'Geed_Deeble_NDVI_Thesis', fileFormat:'CSV'});
[ [img2000, '2000'], [img2008, '2008'], [img2016, '2016'], [img2024, '2024'] ].forEach(function(item) {
  Export.image.toDrive({image:item[0].select('NDVI'), description:'Geed_Deeble_NDVI_' + item[1], folder:'Geed_Deeble_NDVI_Thesis', region:aoi.geometry(), scale:30, crs:'EPSG:32638', maxPixels:1e13});
});
Export.image.toDrive({image:ndviChange, description:'Geed_Deeble_NDVI_Change_2000_2024', folder:'Geed_Deeble_NDVI_Thesis', region:aoi.geometry(), scale:30, crs:'EPSG:32638', maxPixels:1e13});
