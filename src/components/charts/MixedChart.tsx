import React, { FC } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";

import { getFormattedText } from "../../utils/getFormattedText";
import ChartInfo from "../../types/ChartInfo";

interface MixedChartProps {
  chartInfo: ChartInfo;
}

const MixedChart: FC<MixedChartProps> = ({ chartInfo }) => {
  const { chartData, captions, chartTitle } = chartInfo;

  const sortedKeys = Object.keys(chartData[0]).sort((a, b) => {
    return +a - +b;
  });

  const labels = sortedKeys.map((key) => captions[key]);

  const series = chartData.map((sourceColumn: { [key: string]: number }) => {
    const valuesArray = sortedKeys.map((key) => sourceColumn[key]);

    return { values: valuesArray };
  });

  let chartConfig = {
    type: "bar",
    globals: {
      fontSize: "14px",
      fontFamily: "Helvetica",
    },
    title: {
      text: getFormattedText(chartTitle!),
      paddingLeft: "50px",
      fontSize: "24px",
      textAlign: "left",
    },
    plotarea: {
      marginTop: "100px",
      adjustLayout: true,
    },
    legend: {
      cursor: "hand",
      draggable: true,
      dragHandler: "icon",
      toggleAction: "remove",
      minimize: true,
      header: {
        height: "20px",
        text: getFormattedText(chartTitle!),
      },
    },
    plot: {
      animation: {
        effect: "ANIMATION_SLIDE_TOP",
        method: "ANIMATION_BOUNCE_EASE_OUT",
        sequence: "ANIMATION_NO_SEQUENCE",
        speed: 975,
      },
      lineWidth: "3px",
      marker: {
        borderWidth: "0px",
        size: "6px",
      },
    },
    scaleX: {
      labels,
    },
    scaleY: {},
    series: series,
  };

  return <ZingChart data={chartConfig} />;
};

export default MixedChart;
