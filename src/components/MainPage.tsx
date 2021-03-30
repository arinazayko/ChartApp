import React, { FC, useState, useMemo, useCallback } from "react";

import CsvValues from "../types/CsvValues";
import { ChartType } from "../enums/chartType";
import { CsvValueName } from "../enums/csvValue";
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

import { Container } from "react-bootstrap";

const MainPage: FC = () => {
  const [chartName, setChartName] = useState("");
  const [csvData, setCsvData] = useState<CsvValues[]>([]);

  const chartNameExceptions: { [key: string]: CsvValueName[] } = useMemo(() => {
    return {
      RaceComparison: [CsvValueName.BorrowerRace, CsvValueName.CoBorrowerRace],
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

      // 'value' is the number representing a specific race\gender etc.
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

  const getBorrowerRaceGenderData = useCallback(
    (data: CsvValues[]): BasicChartData => {
      return data.reduce(
        (raceCountByGender: { [genderNumber: string]: number[] }, dataRow) => {
          const gender = dataRow[CsvValueName.BorrowerGender];
          const race = dataRow[CsvValueName.BorrowerRace];

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
      case CsvValueName.EnterpriseFlag:
        return {
          captions: enterpriseFlag,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.EnterpriseFlag,
        };

      case CsvValueName.MSACode:
        return {
          captions: MSACode,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.MSACode,
        };

      case CsvValueName.CensusTract:
        return {
          captions: censusTract,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.CensusTract,
        };

      case CsvValueName.TractIncomeRatio:
        return {
          captions: tractIncomeRatio,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.TractIncomeRatio,
        };

      case CsvValueName.BorrowerIncomeRatio:
        return {
          captions: borrowerIncomeRatio,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.BorrowerIncomeRatio,
        };

      case CsvValueName.LTV:
        return {
          captions: LTV,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.LTV,
        };

      case CsvValueName.PurposeOfLoan:
        return {
          captions: purposeOfLoan,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.PurposeOfLoan,
        };

      case CsvValueName.FederalGuarantee:
        return {
          captions: federalGuarantee,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.FederalGuarantee,
        };

      case CsvValueName.BorrowerRace:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartType.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValueName.BorrowerRace,
        };

      case CsvValueName.CoBorrowerRace:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.CoBorrowerRace,
        };

      case CsvValueName.BorrowerGender:
        return {
          captions: borrowerGender,
          chartType: ChartType.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValueName.BorrowerGender,
        };

      case CsvValueName.CoBorrowerGender:
        return {
          captions: coBorrowerGender,
          chartType: ChartType.Bar,
          chartData: hBarData(typeAmounts[0]),
          chartTitle: CsvValueName.CoBorrowerGender,
        };

      case CsvValueName.UnitAffordabilityCategory:
        return {
          captions: unitAffordabilityCategory,
          chartType: ChartType.Pie,
          chartData: typeAmounts,
          chartTitle: CsvValueName.UnitAffordabilityCategory,
        };

      case CsvValueName.RaceComparison:
        return {
          captions: { ...race, "9": "Not available" },
          chartType: ChartType.Mixed,
          chartData: typeAmounts,
          chartTitle: CsvValueName.RaceComparison,
        };

      case CsvValueName.BorrowerRaceGenderComparison:
        return {
          captions: race,
          chartType: ChartType.RaceGender,
          chartData: [getBorrowerRaceGenderData(csvData)],
          chartTitle: CsvValueName.BorrowerRaceGenderComparison,
        };

      default:
        return null;
    }
  }, [typeAmounts, chartName, csvData, hBarData, getBorrowerRaceGenderData]);

  const onArrayChange = (csvData: CsvValues[]) => {
    setCsvData(csvData);
  };

  return (
    <Container fluid className="mt-3">
      <h1>Charts</h1>
      <UploadFile onArrayChange={onArrayChange} />
      <main className="d-flex">
        <Sidebar setChartName={setChartName} />
        <ChartComponent chartInfo={chartInfo} />
      </main>
    </Container>
  );
};

export default MainPage;
