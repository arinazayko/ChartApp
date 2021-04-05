import React, { FC, useMemo } from "react";
import "zingchart/es6";
import ZingChart from "zingchart-react";

import { getFormattedText } from "../../utils/getFormattedText";
import ChartInfo from "../../types/ChartInfo";
import { chartColors } from "../../constants/colors";

interface PieChartProps {
  chartInfo: ChartInfo;
}

const PieChart: FC<PieChartProps> = ({ chartInfo }) => {
  const { chartData, captions, chartTitle } = chartInfo;

  let chartConfig = useMemo(() => {
    return {
      globals: { fontFamily: "Helvetica" },
      graphset: [
        {
          type: "pie",
          width: "100%",
          height: "100%",
          x: "0px",
          y: "0px",
          title: {
            text: getFormattedText(chartTitle!),
            fontSize: "24px",
          },
          legend: {
            marker: {
              size: 14,
              cursor: "hand",
            },
            item: {
              padding: "3px 5px",
              cursor: "hand",
              fontSize: "14px",
            },
            adustLayout: true,
            align: "right",
            verticalAlign: "middle",
            toggleAction: "remove",
          },
          plot: {
            cursor: "hand",
            animation: {
              effect: "ANIMATION_EXPAND_VERTICAL",
              method: "ANIMATION_REGULAR_EASE_OUT",
              sequence: "ANIMATION_BY_PLOT",
              speed: 500,
            },
            valueBox: {
              placement: "out",
              text: "%t",
              color: "#000",
              fontSize: "14px",
              fontWeight: "none",
            },
            borderWidth: "0px",
            refAngle: 90,
          },
          tooltip: {
            text:
              "<b style='font-size:17px;'>%node-percent-value%</b><br>%plot-text",
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
          series: Object.keys(chartData[0]).map((fieldName, i) => {
            return {
              text: captions[fieldName],
              dataIndex: captions[fieldName],
              values: [chartData[0][fieldName]],
              backgroundColor: chartColors[i],
            };
          }),
        },
      ],
    };
  }, [captions, chartData, chartTitle]);

  return <ZingChart data={chartConfig} />;
};

export default PieChart;
