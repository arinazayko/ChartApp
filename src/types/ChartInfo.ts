export default interface ChartInfo {
  captions: any;
  chartType: string;
  chartTitle?: string;
  chartData: { [key: string]: number };
}
