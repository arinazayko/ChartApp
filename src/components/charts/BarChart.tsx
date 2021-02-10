import React, { FC, useMemo, memo } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";
import ChartInfo from "../../types/ChartInfo";

interface BarChartProps {
  chartInfo: ChartInfo;
}

const BarChart: FC<BarChartProps> = ({ chartInfo }) => {
  const chartColors: string[] = useMemo(() => {
    return ["#03a9f4", "#ff9800", "#4caf50", "#ff5722"];
  }, []);

  let chartConfig = {
    type: "hbar",
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
    series: Object.keys(chartInfo.chartData[0]).map((fieldName, i) => {
      return {
        text: chartInfo.captions[fieldName],
        dataIndex: chartInfo.captions[fieldName],
        values: [chartInfo.chartData[0][fieldName]],
        stack: i,
        backgroundColor: chartColors[i],
      };
    }),
  };

  return <ZingChart data={chartConfig} />;
};

export default memo(BarChart);
