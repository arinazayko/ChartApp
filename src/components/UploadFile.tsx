import React, { FC, FocusEvent, memo, useCallback } from "react";
import { Form } from "react-bootstrap";

import csvToJson from "csvtojson";
import CsvValues from "../types/CsvValues";

interface UploadFileProps {
  onArrayChange: (array: CsvValues[]) => void;
}

const UploadFile: FC<UploadFileProps> = ({ onArrayChange }) => {
  const showFile = useCallback(
    async (e: FocusEvent<HTMLInputElement>) => {
      e.preventDefault();

      const reader = new FileReader();

      reader.onload = async (e: any) => {
        console.log("onload started");
        const text = e.target.result;

        csvToJson({
          headers: [
            "EnterpriseFlag",
            "RecordNumber",
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
            "NumberOfUnits",
            "UnitAffordabilityCategory",
          ],
          noheader: true,
          ignoreEmpty: true,
          trim: true,
        })
          .fromString(text.replace(/[ ]+/g, ","))
          .then((jsonObj: any) => {
            onArrayChange(jsonObj);
          });
      };

      if (e.target.files) {
        reader.readAsText(e.target.files[0]);
      }
    },
    [onArrayChange]
  );

  return (
    <Form className="mb-3">
      <Form.Group>
        <Form.File id="exampleFormControlFile1" onChange={showFile} />
      </Form.Group>
    </Form>
  );
};

export default memo(UploadFile);
