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
      margin: "50px dynamic dynamic dynamic",
    },
    // plot represents general series, or plots, styling
    plot: {
      stacked: true,
      tooltip: {
        visible: false,
      },
      animation: {
        effect: "ANIMATION_SLIDE_TOP",
        method: "ANIMATION_BOUNCE_EASE_OUT",
        sequence: "ANIMATION_NO_SEQUENCE",
        speed: 975,
      },
      lineWidth: "3px",
      // line node styling
      marker: {
        borderWidth: "0px",
        size: "6px",
      },
    },
    scaleX: {
      // set scale label
      label: {
        text: "Days",
      },
      // convert text on scale indices
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    scaleY: {
      // scale label with unicode character
      label: {
        text: "Work Productivity",
      },
      format: "%v%",
    },
    crosshairX: {
      plotLabel: {
        padding: "10px 15px",
        borderRadius: "3px",
        sortByValue: "asc",
      },
      lineWidth: "100%",
      alpha: 0.28,
    },
    series: Object.keys(chartInfo.chartData).map((fieldName, i) => {
      return {
        text: chartInfo.captions[fieldName],
        dataIndex: chartInfo.captions[fieldName],
        values: [chartInfo.chartData[fieldName]],
        backgroundColor: chartColors[i],
      };
    }),
  };

  return <ZingChart data={chartConfig} />;
};

export default memo(BarChart);
