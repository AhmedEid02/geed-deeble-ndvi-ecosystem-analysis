# Geed Deeble NDVI Ecosystem Analysis

![Study area map](outputs/maps/Map_01_Study_Area_Map.png)

## Overview

This repository presents a clean, reproducible, and portfolio-ready NDVI analysis workflow for the **Geed Deeble Forest Reserve ecosystem, Somaliland**. The project uses multi-temporal Landsat imagery to assess vegetation greenness and vegetation condition change for **2000, 2008, 2016, and 2024** during the **MAM/Gu season**.

The work demonstrates an end-to-end geospatial workflow using **Google Earth Engine**, **RStudio**, and GIS-ready outputs.

## Study Area

- **Study area:** Geed Deeble Forest Reserve ecosystem
- **Location:** Near Hargeisa, Somaliland
- **AOI area:** approximately 58.93 km² / 5,892.56 ha
- **Centroid:** approximately 43.9749°E, 9.7600°N

## Data and Methods

The analysis used Landsat Collection 2 Level-2 Surface Reflectance imagery.

| Year | Sensor used | Image count | Season |
|---|---|---:|---|
| 2000 | Landsat 5 TM | 5 | MAM / Gu |
| 2008 | Landsat 7 ETM+ | 5 | MAM / Gu |
| 2016 | Landsat 8 OLI | 6 | MAM / Gu |
| 2024 | Landsat 8 OLI + Landsat 9 OLI-2 | 11 | MAM / Gu |

NDVI was calculated as:

```text
NDVI = (NIR - Red) / (NIR + Red)
```

## Key Outputs

### Figures

![Mean NDVI Trend](outputs/figures/Figure_01_Mean_NDVI_Trend.png)

![NDVI Class Percentage](outputs/figures/Figure_02_NDVI_Class_Percentage_Stacked.png)

### Maps

![AOI Closeup](outputs/maps/Map_02_AOI_Closeup_QC.png)

## Main Results

| Year | Mean NDVI |
|---|---:|
| 2000 | 0.113 |
| 2008 | 0.114 |
| 2016 | 0.162 |
| 2024 | 0.201 |

The NDVI class results show a clear shift from dominant bare/degraded conditions in 2000 and 2008 toward very sparse vegetation dominance by 2024. The results should be interpreted as dryland seasonal vegetation greenness change and sparse vegetation recovery, not direct proof of full forest regeneration.

## Repository Structure

```text
geed-deeble-ndvi-ecosystem-analysis/
├── data/
│   ├── aoi/
│   ├── tables/
│   └── geotiffs/
├── scripts/
│   ├── gee/
│   └── r/
├── outputs/
│   ├── figures/
│   ├── maps/
│   └── tables/
├── docs/
```

## Tools Used

- Google Earth Engine
- RStudio
- Python / GeoPandas for repository map preparation
- Landsat Collection 2 Surface Reflectance

## Author

**Ahmed Hussein Ismail**  
Agro-meteorology, remote sensing, climate-smart agriculture, and dryland ecosystem monitoring.

## Notes

This GitHub version is designed as a lightweight portfolio and reproducibility package. Large GeoTIFF outputs are intentionally excluded from the repository and can be reproduced using the GEE script.
