import React, { FC } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";

import { getFormattedText } from "../../utils/getFormattedText";
import ChartInfo from "../../types/ChartInfo";
import { chartColors } from "../../constants/colors";

interface BarChartProps {
  chartInfo: ChartInfo;
}

const BarChart: FC<BarChartProps> = ({ chartInfo }) => {
  const { chartData, captions, chartTitle } = chartInfo;

  let chartConfig = {
    type: "hbar",
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
    plotarea: {
      margin: "dynamic",
    },
    plot: {
      stacked: true,
      stackType: 100,
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
      visible: false,
    },
    scaleY: {
      format: "%v%",
      minValue: 0,
      maxValue: 100,
    },
    series: Object.keys(chartData[0]).map((fieldName, i) => {
      return {
        text: captions[fieldName],
        dataIndex: captions[fieldName],
        values: [chartData[0][fieldName]],
        stack: i,
        backgroundColor: chartColors[i],
      };
    }),
  };

  return <ZingChart data={chartConfig} />;
};

export default BarChart;
