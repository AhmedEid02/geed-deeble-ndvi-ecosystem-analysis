# Methodology Notes

## Geed Deeble Forest Reserve NDVI Analysis

### 1. Study design
This study used a remote sensing-based approach to assess vegetation dynamics in the **Geed Deeble Forest Reserve ecosystem**. Multi-temporal Landsat imagery was used to calculate NDVI and examine changes in vegetation greenness between **2000, 2008, 2016, and 2024**.

The analysis focused on the **MAM/Gu season** to maintain seasonal consistency across the selected years.

### 2. Study area and AOI
The Area of Interest (AOI) was the **Geed Deeble Forest Reserve ecosystem**, located near Hargeisa, Somaliland. The AOI shapefile was uploaded to Google Earth Engine and validated before analysis.

AOI characteristics:

- Area: approximately **58.93 km²**
- Area: approximately **5,892.56 ha**
- Centroid: approximately **43.9749°E, 9.7600°N**
- Geometry: polygon
- Number of features: 1

The same AOI was used for all NDVI maps, class maps, change analysis, and statistics.

### 3. Satellite data
The study used **Landsat Collection 2 Level-2 Surface Reflectance** imagery.

| Year | Sensor | Reason |
|---|---|---|
| 2000 | Landsat 5 TM | Suitable MAM/Gu images were available |
| 2008 | Landsat 7 ETM+ | Suitable MAM/Gu images were available |
| 2016 | Landsat 8 OLI | Good quality imagery available |
| 2024 | Landsat 8 OLI + Landsat 9 OLI-2 | Combined to improve image availability |

### 4. Image availability

| Year | Sensor used | Image count |
|---|---|---:|
| 2000 | Landsat 5 | 5 |
| 2008 | Landsat 7 | 5 |
| 2016 | Landsat 8 | 6 |
| 2024 | Landsat 8 + 9 | 11 |

### 5. Pre-processing
The images were processed in Google Earth Engine. The main preprocessing steps included:

1. Filtering Landsat images by AOI.
2. Filtering images by date for the MAM/Gu season.
3. Applying cloud and cloud-shadow masking using the QA_PIXEL band.
4. Applying Landsat Collection 2 Surface Reflectance scale factors.
5. Creating seasonal median composites for each selected year.
6. Clipping all outputs to the Geed Deeble AOI.

### 6. NDVI calculation
NDVI was calculated using the standard formula:

`NDVI = (NIR - Red) / (NIR + Red)`

For Landsat 5 and 7:

- Red band: SR_B3
- NIR band: SR_B4

For Landsat 8 and 9:

- Red band: SR_B4
- NIR band: SR_B5

### 7. NDVI classification

| NDVI range | Class name |
|---|---|
| < 0.00 | Negative / water / shadow |
| 0.00–0.15 | Bare or degraded land |
| 0.15–0.25 | Very sparse vegetation |
| 0.25–0.40 | Sparse vegetation |
| 0.40–0.60 | Moderate vegetation |
| > 0.60 | Dense vegetation |

These classes are appropriate for dryland vegetation assessment, but should be interpreted cautiously because exposed soil and seasonal rainfall can influence NDVI values.

### 8. NDVI change analysis
NDVI change was calculated by subtracting the 2000 NDVI raster from the 2024 NDVI raster:

`NDVI Change = NDVI 2024 - NDVI 2000`

Interpretation:

- Negative values indicate NDVI decrease.
- Values near zero indicate little or no change.
- Positive values indicate NDVI increase.

### 9. Area statistics
The area of each NDVI class was calculated in hectares. Percentages were also calculated to show the share of each class within the AOI.

### 10. Software used
The analysis used:

- **Google Earth Engine** for Landsat processing, NDVI calculation, classification, statistics, and GeoTIFF/CSV export.
- **RStudio** for clean tables, publication-style figures, and map preparation.

### 11. Important limitations
1. NDVI measures greenness, not full ecosystem health.
2. NDVI is sensitive to rainfall seasonality.
3. Landsat has 30 m spatial resolution, so small vegetation patches may not be captured.
4. Landsat 7 imagery from 2008 may be affected by SLC-off gaps, though seasonal compositing helps reduce this issue.
5. NDVI alone cannot fully identify whether changes are caused by rainfall, grazing, cutting, protection, or other human activities.
6. Field validation and rainfall data would strengthen the interpretation.

### 12. Suggested methodology paragraph
> This study applied a multi-temporal remote sensing approach to assess vegetation dynamics in the Geed Deeble Forest Reserve ecosystem, Somaliland. Landsat Collection 2 Level-2 Surface Reflectance imagery was obtained for 2000, 2008, 2016, and 2024 during the MAM/Gu season. Landsat 5 TM was used for 2000, Landsat 7 ETM+ for 2008, Landsat 8 OLI for 2016, and Landsat 8/9 OLI-2 for 2024. Images were cloud-masked, scaled to surface reflectance, composited using seasonal median values, and clipped to the Geed Deeble AOI. NDVI was calculated from the red and near-infrared bands and classified into vegetation condition classes ranging from bare/degraded land to dense vegetation. NDVI change between 2000 and 2024 was calculated to identify areas of vegetation greenness gain and loss. Area statistics were generated for each NDVI class to quantify vegetation condition changes across the reserve.
