import React, { FC, MouseEvent, memo, useCallback } from "react";

import { getFormattedText } from "../utils/getFormattedText";
import { ListGroup } from "react-bootstrap";

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
    <ListGroup variant="flush" className="mw-25">
      {chartNames.map((name: string) => (
        <ListGroup.Item action onClick={onClick(name)}>
          {getFormattedText(name)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default memo(Sidebar);
