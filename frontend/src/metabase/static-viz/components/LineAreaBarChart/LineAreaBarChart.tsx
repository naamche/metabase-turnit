import _ from "underscore";
import type { ColorGetter } from "metabase/static-viz/lib/colors";
import { XYChart } from "../XYChart";
import type { CardSeries, ChartSettings, ChartStyle } from "../XYChart/types";
import type { Colors } from "./types";
import {
  adjustSettings,
  calculateChartSize,
  getXValuesCount,
} from "./utils/settings";
import {
  getSeriesWithColors,
  getSeriesWithLegends,
  removeNoneSeriesFields,
  reorderSeries,
} from "./utils/series";

interface LineAreaBarChartProps {
  multipleSeries: CardSeries[];
  settings: ChartSettings;
  colors: Colors;
  getColor: ColorGetter;
}

const LineAreaBarChart = ({
  multipleSeries,
  settings,
  getColor,
  colors: instanceColors,
}: LineAreaBarChartProps) => {
  const chartStyle: ChartStyle = {
    /* CHANGED */
    fontFamily: "Roboto, sans-serif",
    axes: {
      color: getColor("text-light"),
      ticks: {
        /* CHANGED */
        color: getColor("text-dark"),
        fontSize: 12,
      },
      labels: {
        /* CHANGED */
        color: getColor("text-dark"),
        fontSize: 14,
        /* CHANGED */
        fontWeight: 500,
      },
    },
    legend: {
      fontSize: 14,
      lineHeight: 20,
      /* CHANGED */
      fontWeight: 500,
    },
    value: {
      color: getColor("text-dark"),
      fontSize: 12,
      /* CHANGED */
      fontWeight: 500,
      stroke: getColor("white"),
      strokeWidth: 3,
    },
    /* CHANGED */
    goalColor: getColor("text-dark"),
  };

  const series = pipe(
    _.partial(getSeriesWithColors, settings, instanceColors),
    _.partial(getSeriesWithLegends, settings),
    _.partial(reorderSeries, settings),
    _.flatten,
    removeNoneSeriesFields,
  )(multipleSeries);

  const minTickSize = chartStyle.axes.ticks.fontSize * 1.5;
  const xValuesCount = getXValuesCount(series);
  const chartSize = calculateChartSize(settings, xValuesCount, minTickSize);
  const adjustedSettings = adjustSettings(
    settings,
    xValuesCount,
    minTickSize,
    chartSize,
  );

  return (
    <XYChart
      series={series}
      settings={adjustedSettings}
      style={chartStyle}
      width={chartSize.width}
      height={chartSize.height}
    />
  );
};

function pipe(...functions: ((arg: any) => any)[]) {
  return _.compose(...functions.reverse());
}

// eslint-disable-next-line import/no-default-export -- deprecated usage
export default LineAreaBarChart;
