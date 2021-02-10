import React, { FC, memo, useCallback } from "react";
import ChartInfo from "../types/ChartInfo";

import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import MixedChart from "./charts/MixedChart";

interface ChartComponentProps {
  chartInfo: ChartInfo | null;
}

const ChartComponent: FC<ChartComponentProps> = ({ chartInfo }) => {
  const renderChart = useCallback(() => {
    if (!chartInfo) {
      return null;
    }

    switch (chartInfo.chartType) {
      case "pie":
        return <PieChart chartInfo={chartInfo} />;

      case "bar":
        return <BarChart chartInfo={chartInfo} />;

      case "mixed":
        return <MixedChart chartInfo={chartInfo} />;
    }
  }, [chartInfo]);

  return <>{renderChart()}</>;
};

export default memo(ChartComponent);
