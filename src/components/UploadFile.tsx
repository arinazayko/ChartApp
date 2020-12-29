import React, { FC, FocusEvent, memo, useCallback } from "react";
import csvToJson from "csvtojson";
import CsvValue from "../types/CsvValue";

interface UploadFileProps {
  onArrayChange: (array: CsvValue[]) => void;
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

  return <input type="file" onChange={showFile} />;
};

export default memo(UploadFile);
