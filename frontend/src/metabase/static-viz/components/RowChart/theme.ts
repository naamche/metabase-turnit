import type { ColorGetter } from "metabase/static-viz/lib/colors";
import type { RowChartTheme } from "metabase/visualizations/shared/components/RowChart/types";

export const getStaticChartTheme = (
  getColor: ColorGetter,
  // Changed
  fontFamily = "Inter",
): RowChartTheme => {
  return {
    axis: {
      color: getColor("bg-dark"),
      ticks: {
        size: 12,
        /* CHANGED */
        weight: 500,
        color: getColor("bg-dark"),
        family: fontFamily,
      },
      label: {
        size: 14,
        /* CHANGED */
        weight: 500,
        color: getColor("bg-dark"),
        family: fontFamily,
      },
    },
    goal: {
      lineStroke: getColor("text-medium"),
      label: {
        size: 14,
        /* CHANGED */
        weight: 500,
        color: getColor("text-medium"),
        family: fontFamily,
      },
    },
    dataLabels: {
      /* CHANGED */
      weight: 500,
      color: getColor("text-dark"),
      size: 12,
      family: fontFamily,
    },
    grid: {
      color: getColor("border"),
    },
  };
};
