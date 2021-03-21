import React, { FC, MouseEvent, memo, useCallback } from "react";

import { getFormattedText } from "../utils/getFormattedText";

import "./Sidebar.styles.css";

interface SidebarProps {
  setChartName: any;
}

const chartNames = [
  "EnterpriseFlag",
  "MSACode",
  "CensusTract",
  "TractIncomeRatio",
  "BorrowerIncomeRatio",
  "LTV",
  "PurposeOfLoan",
  "FederalGuarantee",
  "BorrowerRace",
  "CoBorrowerRace",
  "BorrowerGender",
  "CoBorrowerGender",
  "UnitAffordabilityCategory",
  "RaceComparison",
  "BorrowerRaceGenderComparison",
];

const Sidebar: FC<SidebarProps> = ({ setChartName }) => {
  const onClick = useCallback(
    (name) => (event: MouseEvent<HTMLLIElement>) => {
      setChartName(name);
    },
    [setChartName]
  );

  return (
    <ul className="sidebarList">
      {chartNames.map((name: string) => (
        <li className="listItem" onClick={onClick(name)}>
          {getFormattedText(name)}
        </li>
      ))}
    </ul>
  );
};

export default memo(Sidebar);
