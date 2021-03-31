import React, { FC } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";

import { getFormattedText } from "../../utils/getFormattedText";
import ChartInfo from "../../types/ChartInfo";

interface MixedChartProps {
  chartInfo: ChartInfo;
}

const chartColors = ["#03a9f4", "#ff9800", "#4caf50", "#ff5722"];

const RaceGender: FC<MixedChartProps> = ({ chartInfo }) => {
  const { chartData, captions, chartTitle, legend } = chartInfo;
  const data = chartData[0];

  const sortedKeys = Object.keys(captions).sort((a, b) => {
    return +a - +b;
  });

  const labels = sortedKeys.map((key) => captions[key]);

  const series = Object.keys(data).map((key: string, i: number) => {
    const valuesArray = data[key];

    return {
      text: legend[key],
      values: valuesArray,
      backgroundColor: chartColors[i],
      hoverState: {
        backgroundColor: "#2956A0",
      },
    };
  });

  let chartConfig = {
    type: "bar",
    globals: {
      fontSize: "14px",
      fontFamily: "Helvetica",
    },
    title: {
      text: getFormattedText(chartTitle!),
      fontSize: "24px",
    },
    plot: {
      stacked: true,
      animation: {
        effect: "ANIMATION_SLIDE_TOP",
        method: "ANIMATION_BOUNCE_EASE_OUT",
        sequence: "ANIMATION_NO_SEQUENCE",
        speed: 975,
      },
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
    scaleX: {
      values: labels,
      guide: {
        visible: false,
      },
    },
    scaleY: {
      guide: {
        lineStyle: "solid",
      },
    },
    tooltip: {
      text: "<b style='font-size:17px;'>%node-percent-value%</b><br>%plot-text",
      padding: "10px",
      backgroundColor: "#fff",
      borderColor: "#666",
      borderRadius: "11px",
      borderWidth: "1px",
      color: "#000",
      shadow: true,
      textAlign: "left",
      fontSize: "12px",
    },
    series: series,
  };

  return <ZingChart data={chartConfig} />;
};

export default RaceGender;
