import React, { FC, useState, useMemo, useCallback } from "react";

import CsvValue from "../types/CsvValue";
import { ChartTypes } from "../enums/chartTypes";
import { CsvValues } from "../enums/csvValues";
import ChartInfo, { BasicChartData } from "../types/ChartInfo";
import {
  enterpriseFlag,
  MSACode,
  censusTract,
  tractIncomeRatio,
  borrowerIncomeRatio,
  LTV,
  purposeOfLoan,
  federalGuarantee,
  race,
  borrowerGender,
  coBorrowerGender,
  unitAffordabilityCategory,
} from "../constants/chartValues";

import UploadFile from "./UploadFile";
import Sidebar from "./Sidebar";
import ChartComponent from "./ChartComponent";

import "./MainPage.styles.css";

const MainPage: FC = () => {
  const [chartName, setChartName] = useState("");
  const [csvData, setCsvData] = useState<CsvValue[]>([]);

  const chartNameExceptions: { [key: string]: CsvValues[] } = useMemo(() => {
    return {
      RaceComparison: [CsvValues.BorrowerRace, CsvValues.CoBorrowerRace],
    };
  }, []);

  const columnsArray = useMemo(
    () => chartNameExceptions[chartName] || [chartName],
    [chartName, chartNameExceptions]
  );

  const typeAmounts = useMemo((): BasicChartData[] | null => {
    if (!csvData.length) {
      return null;
    }

    return columnsArray.map((columnName) => {
      const chosenColumnData = csvData.map((dataRow) => {
        return dataRow[columnName];
      });

      // valueNumber is the number representing a specific race\gender etc.
      return chosenColumnData.reduce(
        (amounts: { [key: string]: number }, valueNumber: string) => {
          const currentAmount = amounts[valueNumber] || 0;
          amounts[valueNumber] = currentAmount + 1;

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

  const borrowerRaceGenderData = useCallback(
    (data: CsvValue[]): BasicChartData => {
      return data.reduce(
        (raceCountByGender: { [genderNumber: string]: number[] }, dataRow) => {
          const gender = dataRow[CsvValues.BorrowerGender];
          const race = dataRow[CsvValues.BorrowerRace];

          // Ignore everything but "male"/"female" and "unknown" race
          if (+gender > 2 || race === "9") {
            return raceCountByGender;
          }

          const raceCountForCurrentGender = raceCountByGender[gender] || [];

          const raceCountArrayIndex = +race - 1;

          raceCountForCurrentGender[raceCountArrayIndex] =
            (raceCountForCurrentGender[raceCountArrayIndex] || 0) + 1;

          return { ...raceCountByGender, [gender]: raceCountForCurrentGender };
        },
        {}
      );
    },
    []
  );

  const chartInfo: ChartInfo | null = useMemo(() => {
    if (!typeAmounts || !chartName || !csvData) {
      return null;
    }

    switch (chartName) {
      case CsvValues.EnterpriseFlag:
        return {
          captions: enterpriseFlag,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.EnterpriseFlag,
        };

      case CsvValues.MSACode:
        return {
          captions: MSACode,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.MSACode,
        };

      case CsvValues.CensusTract:
        return {
          captions: censusTract,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.CensusTract,
        };

      case CsvValues.TractIncomeRatio:
        return {
          captions: tractIncomeRatio,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.TractIncomeRatio,
        };

      case CsvValues.BorrowerIncomeRatio:
        return {
          captions: borrowerIncomeRatio,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.BorrowerIncomeRatio,
        };

      case CsvValues.LTV:
        return {
          captions: LTV,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.LTV,
        };

      case CsvValues.PurposeOfLoan:
        return {
          captions: purposeOfLoan,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.PurposeOfLoan,
        };

      case CsvValues.FederalGuarantee:
        return {
          captions: federalGuarantee,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.FederalGuarantee,
        };

      case CsvValues.BorrowerRace:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartTypes.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.BorrowerRace,
        };

      case CsvValues.CoBorrowerRace:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.CoBorrowerRace,
        };

      case CsvValues.BorrowerGender:
        return {
          captions: borrowerGender,
          chartType: ChartTypes.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.BorrowerGender,
        };

      case CsvValues.CoBorrowerGender:
        return {
          captions: coBorrowerGender,
          chartType: ChartTypes.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValues.CoBorrowerGender,
        };

      case CsvValues.UnitAffordabilityCategory:
        return {
          captions: unitAffordabilityCategory,
          chartType: ChartTypes.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValues.UnitAffordabilityCategory,
        };

      case CsvValues.RaceComparison:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartTypes.Mixed,
          chartData: typeAmounts,
          chartTitle: CsvValues.RaceComparison,
        };

      case CsvValues.BorrowerRaceGenderComparison:
        return {
          captions: race,
          chartType: ChartTypes.RaceGender,
          chartData: [borrowerRaceGenderData(csvData)],
          chartTitle: CsvValues.BorrowerRaceGenderComparison,
        };

      default:
        return null;
    }
  }, [typeAmounts, chartName, csvData, hBarData, borrowerRaceGenderData]);

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
