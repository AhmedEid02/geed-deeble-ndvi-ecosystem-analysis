# Geed Deeble Forest Reserve NDVI Analysis Package

## 1. Project overview

This folder contains the completed NDVI-based vegetation analysis for the **Geed Deeble Forest Reserve ecosystem, Somaliland**. The work uses multi-temporal Landsat satellite data to assess vegetation greenness, vegetation condition classes, and NDVI change between **2000, 2008, 2016, and 2024**.

The purpose of this package is to support MSc thesis writing with ready-to-use maps, figures, tables, scripts, and interpretation notes.

---

## 2. Study area

The study area is the **Geed Deeble Forest Reserve ecosystem**, located near Hargeisa, Somaliland.

The Area of Interest (AOI) shapefile was validated before analysis. The AOI covers approximately:

- **58.93 km²**
- **5,892.56 hectares**

The AOI was used consistently for all Landsat NDVI processing, statistics, maps, and figures.

---

## 3. Data used

The analysis used **Landsat Collection 2 Level-2 Surface Reflectance** imagery.

| Year | Sensor used | Season |
|---|---|---|
| 2000 | Landsat 5 TM | MAM / Gu season |
| 2008 | Landsat 7 ETM+ | MAM / Gu season |
| 2016 | Landsat 8 OLI | MAM / Gu season |
| 2024 | Landsat 8 OLI + Landsat 9 OLI-2 | MAM / Gu season |

The MAM/Gu season was used to keep the year-to-year NDVI comparison seasonally consistent.

---

## 4. Main method

The analysis followed these steps:

1. The Geed Deeble Forest Reserve AOI shapefile was uploaded and validated in Google Earth Engine.
2. Landsat image availability was checked for the selected years.
3. Landsat images were cloud-masked and converted to surface reflectance.
4. Seasonal median composites were created for each year.
5. NDVI was calculated using the formula:

   `NDVI = (NIR - Red) / (NIR + Red)`

6. NDVI maps were produced for 2000, 2008, 2016, and 2024.
7. NDVI values were classified into vegetation condition classes.
8. Area and percentage statistics were calculated for each NDVI class.
9. NDVI change from 2000 to 2024 was calculated.
10. Final tables, figures, and maps were produced using RStudio.

---

## 5. NDVI classes used

| NDVI class | Vegetation condition |
|---|---|
| < 0.00 | Negative / water / shadow |
| 0.00–0.15 | Bare or degraded land |
| 0.15–0.25 | Very sparse vegetation |
| 0.25–0.40 | Sparse vegetation |
| 0.40–0.60 | Moderate vegetation |
| > 0.60 | Dense vegetation |

These classes are suitable for a dryland ecosystem, but they should be interpreted carefully because NDVI is strongly influenced by rainfall seasonality and soil background.

---

## 6. Main outputs included in this package

### A. Thesis insertion materials

Use these directly in the thesis:

- Word-ready NDVI tables
- Final figures
- Final maps
- Figure and table captions
- Methodology notes
- Results interpretation notes

### B. Data outputs

The data folder includes:

- AOI shapefile
- NDVI GeoTIFF rasters
- NDVI class GeoTIFF rasters
- NDVI change GeoTIFF raster
- Clean CSV tables

### C. Scripts

The scripts folder includes:

- Google Earth Engine scripts for NDVI processing and export
- R scripts for tables, figures, and maps

---

## 7. Key findings

The analysis shows a clear increase in vegetation greenness across the Geed Deeble Forest Reserve ecosystem over the selected years.

### Mean NDVI trend

| Year | Mean NDVI |
|---|---:|
| 2000 | 0.113 |
| 2008 | 0.114 |
| 2016 | 0.162 |
| 2024 | 0.201 |

Mean NDVI increased from **0.113 in 2000** to **0.201 in 2024**.

### Vegetation class change

Bare or degraded land declined strongly, while very sparse vegetation increased.

Important results:

- Bare/degraded land decreased from **93.89% in 2000** to **10.75% in 2024**.
- Very sparse vegetation increased from **5.07% in 2000** to **76.19% in 2024**.
- Moderate vegetation remained limited at **2.95% in 2024**.
- Dense vegetation remained very limited at **0.39% in 2024**.

---

## 8. How to interpret the findings

The results suggest that vegetation greenness increased between 2000 and 2024. However, this should be interpreted carefully.

The correct interpretation is:

> The Geed Deeble Forest Reserve ecosystem showed increased seasonal vegetation greenness and expansion of sparse vegetation cover between 2000 and 2024. However, because the reserve remained dominated by very sparse vegetation in 2024, the change should be understood as dryland greening or sparse vegetation recovery, not full forest regeneration.

Avoid saying:

> The forest fully recovered.

That statement is too strong and is not supported by NDVI alone.

---

## 9. How to use this package in the thesis

### Chapter 3: Methodology

Use the methodology notes and scripts to describe:

- Study area and AOI boundary
- Landsat data sources
- Selected years and season
- NDVI calculation
- NDVI classification
- Change detection
- Area statistics
- Software used: Google Earth Engine and RStudio

### Chapter 4: Results

Use the final tables, figures, and maps to describe:

- Mean NDVI changes from 2000 to 2024
- Spatial NDVI patterns
- NDVI vegetation class changes
- Area and percentage change by vegetation condition
- NDVI change between 2000 and 2024

### Chapter 5: Discussion

Discuss:

- Dryland vegetation greenness change
- Possible rainfall influence
- Possible human pressure
- Grazing and land-use pressure
- Limitations of NDVI
- Conservation implications for Geed Deeble Forest Reserve

---

## 10. Important limitations

The student should mention these limitations in the thesis:

1. NDVI measures vegetation greenness, not full ecosystem health.
2. NDVI is strongly affected by seasonal rainfall, especially in dryland environments.
3. Landsat has 30 m spatial resolution, so small vegetation patches may not be fully captured.
4. Landsat 7 imagery from 2008 may be affected by SLC-off gaps, although a seasonal composite was used to reduce this problem.
5. NDVI alone cannot fully separate climate-driven greenness from human-driven degradation or recovery.
6. Field validation, rainfall analysis, and land-cover classification would strengthen the study.

---

## 11. Recommended additions beyond NDVI

NDVI alone can support a descriptive MSc thesis on vegetation greenness and vegetation condition. However, for a stronger thesis, it is recommended to add one or more supporting analyses:

| Recommended addition | Why it helps |
|---|---|
| Rainfall-NDVI comparison | Helps explain whether greenness change is rainfall-driven |
| SAVI or MSAVI | Better for dryland areas with exposed soil |
| NDMI | Adds vegetation moisture/stress information |
| Land-cover classification | Separates bare land, shrubland, vegetation, and settlement areas |
| Google Earth visual validation | Helps confirm whether map changes are realistic |
| Field photos or GPS points | Provides stronger validation evidence |

Minimum recommended addition:

> NDVI + rainfall comparison + visual validation.

---

## 12. Files to use first

Start with these files:

1. `01_Thesis_Insertion/Word_Tables/`
2. `01_Thesis_Insertion/Final_Figures/`
3. `01_Thesis_Insertion/Final_Maps/`
4. `04_Writing_Guidance/Methodology_Notes.md`
5. `04_Writing_Guidance/Results_Key_Findings.md`
6. `04_Writing_Guidance/Figure_and_Table_Captions.md`

The raw GeoTIFFs and scripts are included for transparency and reproducibility, but the thesis can be written mainly from the final tables, figures, maps, and writing guidance.

---

## 13. Suggested thesis title

A suitable thesis title could be:

**NDVI-Based Assessment of Vegetation Dynamics in the Geed Deeble Forest Reserve Ecosystem, Somaliland, 2000–2024**

Alternative title:

**Multi-Temporal Landsat Assessment of Vegetation Greenness and Ecosystem Condition in Geed Deeble Forest Reserve, Somaliland**

---

## 14. Final note to the student

This package provides the core NDVI analysis and evidence materials. The main task now is to write the thesis clearly and critically. The results should be presented as vegetation greenness and dryland ecosystem condition change, not as direct proof of complete forest recovery.

Use the maps, figures, and tables directly, but explain them carefully in the context of dryland ecology, rainfall variability, and possible human pressure.
