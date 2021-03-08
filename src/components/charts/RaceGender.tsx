import React, { FC, memo, useMemo } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import ChartInfo from "../../types/ChartInfo";

interface MixedChartProps {
  chartInfo: ChartInfo;
}

const RaceGender: FC<MixedChartProps> = ({ chartInfo }) => {
  const chartColors: string[] = useMemo(
    () => ["#03a9f4", "#ff9800", "#4caf50", "#ff5722"],
    []
  );

  const chartData = chartInfo.chartData[0];

  const sortedKeys = Object.keys(chartInfo.captions).sort((a, b) => {
    return +a - +b;
  });

  const labels = sortedKeys.map((key) => chartInfo.captions[key]);

  const series = Object.keys(chartData).map((key: string, i: number) => {
    const valuesArray = chartData[key];
    return {
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
      text: chartInfo.chartTitle?.split(/(?=[A-Z])/).join(" "),
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
        text: chartInfo.chartTitle?.split(/(?=[A-Z])/).join(" "),
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
      padding: "0px",
      backgroundColor: "none",
      htmlMode: true,
      placement: "node:center",
    },
    series: series,
  };

  return <ZingChart data={chartConfig} />;
};

export default memo(RaceGender);
