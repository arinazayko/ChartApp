export default interface ChartInfo {
  captions: any;
  chartType: string;
  chartTitle?: string;
  chartData: BasicChartData[];
}

export interface BasicChartData {
  [key: string]: number;
}
