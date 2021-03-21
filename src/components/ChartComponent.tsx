import React, { FC, memo, useCallback } from "react";

import { ChartTypes } from "../enums/chartTypes";
import ChartInfo from "../types/ChartInfo";

import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import MixedChart from "./charts/MixedChart";
import RaceGender from "./charts/RaceGender";

interface ChartComponentProps {
  chartInfo: ChartInfo | null;
}

const ChartComponent: FC<ChartComponentProps> = ({ chartInfo }) => {
  const renderChart = useCallback(() => {
    if (!chartInfo) {
      return null;
    }

    switch (chartInfo.chartType) {
      case ChartTypes.Pie:
        return <PieChart chartInfo={chartInfo} />;

      case ChartTypes.Bar:
        return <BarChart chartInfo={chartInfo} />;

      case ChartTypes.Mixed:
        return <MixedChart chartInfo={chartInfo} />;

      case ChartTypes.RaceGender:
        return <RaceGender chartInfo={chartInfo} />;
    }
  }, [chartInfo]);

  return <>{renderChart()}</>;
};

export default memo(ChartComponent);
