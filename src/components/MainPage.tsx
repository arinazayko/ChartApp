import React, { FC, useState, useMemo, useCallback } from "react";
import UploadFile from "./UploadFile";
import Sidebar from "./Sidebar";
import ChartComponent from "./ChartComponent";
import CsvValue from "../types/CsvValue";
import { CsvValues } from "../enums/csvValues";
import ChartInfo, { BasicChartData } from "../types/ChartInfo";
import "./MainPage.styles.css";

const MainPage: FC = () => {
  const [chartName, setChartName] = useState("");
  const [csvData, setCsvData] = useState<CsvValue[]>([]);

  const chartNameExceptions: { [key: string]: CsvValues[] } = useMemo(() => {
    return {
      RaceComparison: [CsvValues.BorrowerRace, CsvValues.CoBorrowerRace],
    };
  }, []);

  const columnsArray = useMemo(() => {
    return chartNameExceptions[chartName] || [chartName];
  }, [chartName, chartNameExceptions]);

  const typeAmounts = useMemo((): BasicChartData[] | null => {
    if (!csvData.length) {
      return null;
    }

    return columnsArray.map((columnName) => {
      const chosenColumnData = csvData.map((dataRow) => {
        return dataRow[columnName];
      });

      return chosenColumnData.reduce(
        (amounts: { [key: string]: number }, value: string) => {
          const currentAmount = amounts[value] || 0;
          amounts[value] = currentAmount + 1;

          return amounts;
        },
        {}
      );
    });
  }, [columnsArray, csvData]);

  const hBarData = useCallback(
    (typeAmountsData: BasicChartData): BasicChartData[] => {
      const sum = Object.keys(typeAmountsData).reduce(
        (result: number, key: string) => {
          return result + typeAmountsData[key];
        },
        0
      );

      return [
        Object.keys(typeAmountsData).reduce(
          (result: { [key: string]: number }, value: string) => {
            result[value] = +((typeAmountsData[value] / sum) * 100).toFixed(2);
            return result;
          },
          {}
        ),
      ];
    },
    []
  );

  const chartInfo: ChartInfo | null = useMemo(() => {
    if (!typeAmounts || !chartName) {
      return null;
    }

    switch (chartName) {
      case CsvValues.EnterpriseFlag:
        return {
          captions: {
            "1": "Fannie Mae",
            "2": "Freddie Mac",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.EnterpriseFlag,
        };

      case CsvValues.MSACode:
        return {
          captions: {
            "1": "Metropolitan area",
            "0": "Non-metropolitan area",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.MSACode,
        };

      case CsvValues.CensusTract:
        return {
          captions: {
            "1": ">=0, <10%",
            "2": ">=10, <30%",
            "3": ">=30, <=100%",
            "9": "Missing",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.CensusTract,
        };

      case CsvValues.TractIncomeRatio:
        return {
          captions: {
            "1": ">0, <=80%",
            "2": ">80, <=120%",
            "3": ">120%",
            "9": "Missing",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.TractIncomeRatio,
        };

      case CsvValues.BorrowerIncomeRatio:
        return {
          captions: {
            "1": ">=0,<=50%",
            "2": ">50, <=80%",
            "3": ">80%",
            "9": "Not applicable",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.BorrowerIncomeRatio,
        };

      case CsvValues.LTV:
        return {
          captions: {
            "1": ">0, <=60%",
            "2": ">60, <=80%",
            "3": ">80, <=90%",
            "4": ">90, <=95%",
            "5": ">95%",
            "9": "Missing",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.LTV,
        };

      case CsvValues.PurposeOfLoan:
        return {
          captions: {
            "1": "Purchase",
            "8": "Other",
            "9": "Not applicable",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.PurposeOfLoan,
        };

      case CsvValues.FederalGuarantee:
        return {
          captions: {
            "1": "FHA/VA",
            "2": "Rural Housing Service",
            "3": "Home Equity Conversion Mortgage",
            "4": "No Federal guarantee",
            "5": "FHA",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.FederalGuarantee,
        };

      case CsvValues.BorrowerRace:
        return {
          captions: {
            "1": "American Indian or Alaska Native",
            "2": "Asian",
            "3": "Black or African American",
            "4": "Native Hawaiian or Other Pacific Islander",
            "5": "White",
            "6": "Two or more races",
            "7": "Hispanic or Latino",
            "9": "Not available",
          },
          chartType: "bar",
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.BorrowerRace,
        };

      case CsvValues.CoBorrowerRace:
        return {
          captions: {
            "1": "American Indian or Alaska Native",
            "2": "Asian",
            "3": "Black or African American",
            "4": "Native Hawaiian or Other Pacific Islander",
            "5": "White",
            "6": "Two or more races",
            "7": "Hispanic or Latino",
            "9": "Not available",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.CoBorrowerRace,
        };

      case CsvValues.BorrowerGender:
        return {
          captions: {
            "1": "Male",
            "2": "Female",
            "3": "Information is not provided",
            "4": "Not applicable",
            "9": "Missing",
          },
          chartType: "bar",
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.BorrowerGender,
        };

      case CsvValues.CoBorrowerGender:
        return {
          captions: {
            "1": "Male",
            "2": "Female",
            "3": "Information is not provided",
            "4": "Not applicable",
            "5": "No co-borrower",
            "9": "Missing",
          },
          chartType: "bar",
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.CoBorrowerGender,
        };

      case CsvValues.UnitAffordabilityCategory:
        return {
          captions: {
            "1": "Low-income family in a low-income area",
            "2": "Very low-income family in a low-income area",
            "3": "Very low-income family not in a low-income area",
            "4": "Other",
            "9": "Not available",
            "0": "Missing",
          },
          chartType: "pie",
          chartData: typeAmounts,
          chartTitle: CsvValues.UnitAffordabilityCategory,
        };

      case CsvValues.RaceComparison:
        return {
          captions: {
            "1": "American Indian or Alaska Native",
            "2": "Asian",
            "3": "Black or African American",
            "4": "Native Hawaiian or Other Pacific Islander",
            "5": "White",
            "6": "Two or more races",
            "7": "Hispanic or Latino",
            "9": "Not available",
          },
          chartType: "mixed",
          chartData: typeAmounts,
          chartTitle: CsvValues.RaceComparison,
        };

      default:
        return null;
    }
  }, [typeAmounts, chartName, hBarData]);

  const onArrayChange = (csvData: CsvValue[]) => {
    setCsvData(csvData);
  };

  return (
    <div className="container">
      <UploadFile onArrayChange={onArrayChange} />
      <main className="content">
        <Sidebar setChartName={setChartName} />
        <ChartComponent chartInfo={chartInfo} />
      </main>
    </div>
  );
};

export default MainPage;
