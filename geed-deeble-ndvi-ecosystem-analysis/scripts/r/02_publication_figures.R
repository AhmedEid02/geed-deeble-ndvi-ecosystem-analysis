# Geed Deeble NDVI Analysis - R Script 02: Publication-ready figures
# Run from the repository root.

packages <- c('tidyverse', 'scales', 'ggplot2', 'ragg')
new_packages <- packages[!(packages %in% installed.packages()[, 'Package'])]
if (length(new_packages) > 0) install.packages(new_packages)

library(tidyverse)
library(scales)
library(ggplot2)
library(ragg)

base_dir <- getwd()
tables_dir <- file.path(base_dir, 'data', 'tables')
out_dir <- file.path(base_dir, 'outputs', 'figures')
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

ndvi_stats <- read_csv(file.path(tables_dir, 'ndvi_descriptive_statistics.csv'), show_col_types = FALSE)
class_area <- read_csv(file.path(tables_dir, 'ndvi_class_area_percentage.csv'), show_col_types = FALSE)

theme_geed <- function() {
  theme_minimal(base_size = 13) +
    theme(plot.title = element_text(face='bold', hjust=0.5, size=16),
          plot.subtitle = element_text(hjust=0.5, size=12),
          axis.title = element_text(face='bold'),
          panel.grid.minor = element_blank(),
          panel.grid.major.x = element_blank(),
          legend.title = element_text(face='bold'))
}

fig1 <- ggplot(ndvi_stats, aes(Year, Mean_NDVI)) +
  geom_line(linewidth=1.1) + geom_point(size=3) +
  geom_text(aes(label=round(Mean_NDVI,3)), vjust=-1, size=4) +
  scale_x_continuous(breaks=c(2000,2008,2016,2024)) +
  labs(title='Mean NDVI Trend', subtitle='Geed Deeble Forest Reserve Ecosystem, 2000-2024', x='Year', y='Mean NDVI') +
  theme_geed()

ggsave(file.path(out_dir, 'Figure_01_Mean_NDVI_Trend.png'), fig1, width=8, height=5, dpi=400, device=ragg::agg_png, bg='white')
