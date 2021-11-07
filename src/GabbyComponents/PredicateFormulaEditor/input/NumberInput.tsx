/* eslint-disable import/prefer-default-export */
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const isNumeric = (value: any): boolean => {
  return !Number.isNaN(value - parseFloat(value));
};

const decimalPattern = "/[0-9\\.]*/";

interface IProps {
  datatype: "integer" | "decimal";
  id: string;
  label: string;
  name: string;
  onChange: (value: number | string) => void; // we'll allow empty strings
  value: number | string;
}

export const NumberInput = ({
  datatype,
  id,
  label,
  name,
  onChange,
  value,
}: IProps): JSX.Element => {
  //
  const [hasError, setHasError] = useState(false);

  const handleValueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const inputValue = event.target.value as string;
    onChange(inputValue);
    if (!isNumeric(inputValue)) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <TextField
        error={hasError}
        id={id}
        inputProps={{ inputMode: "numeric", pattern: decimalPattern }}
        label={label}
        name={name}
        type="text" // may not be supported on all browsers
        onChange={handleValueChange}
        value={value}
        variant="outlined"
      />
    </FormControl>
  );
};
