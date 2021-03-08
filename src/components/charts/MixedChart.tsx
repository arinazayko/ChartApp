import React, { FC, memo } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import ChartInfo from "../../types/ChartInfo";

interface MixedChartProps {
  chartInfo: ChartInfo;
}

const MixedChart: FC<MixedChartProps> = ({ chartInfo }) => {
  const sortedKeys = Object.keys(chartInfo.chartData[0]).sort((a, b) => {
    return +a - +b;
  });

  const labels = sortedKeys.map((key) => chartInfo.captions[key]);

  const series = chartInfo.chartData.map(
    (sourceColumn: { [key: string]: number }) => {
      const valuesArray = sortedKeys.map((key) => sourceColumn[key]);
      return { values: valuesArray };
    }
  );

  let chartConfig = {
    type: "bar",
    globals: {
      fontSize: "14px",
      fontFamily: "Helvetica",
    },
    title: {
      text: chartInfo.chartTitle?.split(/(?=[A-Z])/).join(" "),
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
        text: chartInfo.chartTitle?.split(/(?=[A-Z])/).join(" "),
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

export default memo(MixedChart);
