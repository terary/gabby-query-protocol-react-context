import * as React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { blue, green } from "@mui/material/colors";
import { useApplicationUtilities } from "../../Application";

type ConjunctionOperatorType = "$and" | "$or";

type Props = {
  operator: ConjunctionOperatorType;
  onChange: (operator: ConjunctionOperatorType) => void;
};

export function OptionSwitch({ operator, onChange }: Props) {
  const { t } = useApplicationUtilities();
  const conjunctionLabel = t("All of these");
  const disjunctionLabel = t("Any of these");

  const handleOnChange = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) {
      onChange("$and");
    } else {
      onChange("$or");
    }
  };
  return (
    <FormControlLabel
      value="top"
      control={
        <Switch
          style={{ color: operator === "$and" ? blue[50] : green[50] }}
          color="primary"
        />
      }
      label={operator === "$and" ? conjunctionLabel : disjunctionLabel}
      labelPlacement="start"
      checked={operator === "$and"}
      onChange={handleOnChange}
    />
  );
}
