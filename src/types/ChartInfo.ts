export default interface ChartInfo {
  captions: any;
  chartType: string;
  chartData: BasicChartData[];
  chartTitle?: string;
  legend?: any;
}

export interface BasicChartData {
  [key: string]: any;
}
