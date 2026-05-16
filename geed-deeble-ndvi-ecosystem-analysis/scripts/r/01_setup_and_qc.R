# Geed Deeble NDVI Analysis - R Script 01: Setup and QC
# Purpose: load CSV tables and inspect final results.

packages <- c('tidyverse', 'janitor', 'readr')
new_packages <- packages[!(packages %in% installed.packages()[, 'Package'])]
if (length(new_packages) > 0) install.packages(new_packages)

library(tidyverse)
library(janitor)
library(readr)

base_dir <- getwd()

tables_dir <- file.path(base_dir, 'data', 'tables')
ndvi_stats <- read_csv(file.path(tables_dir, 'ndvi_descriptive_statistics.csv'))
class_area <- read_csv(file.path(tables_dir, 'ndvi_class_area_percentage.csv'))
image_availability <- read_csv(file.path(tables_dir, 'landsat_image_availability.csv'))

print(ndvi_stats)
print(class_area)
print(image_availability)
