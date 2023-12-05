import { color } from "metabase/lib/colors";
import type { RowChartTheme } from "metabase/visualizations/shared/components/RowChart/types";

// CHANGED
export const getChartTheme = (fontFamily: string = "Inter"): RowChartTheme => {
  return {
    axis: {
      color: color("text-light"),
      ticks: {
        size: 12,
        /* CHANGED */
        weight: 500,
        /* CHANGED */
        color: color("text-dark"),
        family: fontFamily,
      },
      label: {
        size: 14,
        /* CHANGED */
        weight: 500,
        /* CHANGED */
        color: color("text-dark"),
        family: fontFamily,
      },
    },
    goal: {
      lineStroke: color("text-medium"),
      label: {
        size: 14,
        weight: 700,
        color: color("text-medium"),
        family: fontFamily,
      },
    },
    dataLabels: {
      /* CHANGED */
      weight: 500,
      color: color("text-dark"),
      size: 12,
      family: fontFamily,
    },
    grid: {
      color: color("border"),
    },
  };
};
