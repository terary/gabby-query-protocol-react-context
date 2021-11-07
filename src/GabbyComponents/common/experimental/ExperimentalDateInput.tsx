/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import TextField from "@mui/material/TextField";
import { formatISO } from "date-fns";
import DatePicker from "@mui/lab/DatePicker";
import { useApplicationUtilities } from "../../../Application";
import { AppContextProviders } from "../../../Application/AppContextProviders";

const iso8601LongRegex =
  /^\d{4}-[0-1][0-9]-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d((.\d{3}){0,1}Z|(\+|-)[0-2]\d:[0-5]\d)$/;

const noopIsValid = (value: unknown) => true;

const toMidnight = (date: Date) => {
  const dateWithoutTime = date.toISOString().split("T")[0];
  return new Date(dateWithoutTime);
};

interface Props {
  // formatMask: string;
  id: string;
  isValid?: (value: unknown) => boolean;
  label: string;
  name: string;
  onChange: (value: string) => void; // we'll allow empty strings
  value: string;
}

export function ExperimentalDateInput({
  // formatMask,
  id,
  isValid = noopIsValid,
  label,
  name,
  onChange,
  value,
}: Props): JSX.Element {
  const { getCurrentLocale } = useApplicationUtilities();
  const handleOnChange = (newValue: Date | null) => {
    if (!isValid(newValue)) {
      return;
    }
    if (!newValue || !iso8601LongRegex.test(newValue.toISOString())) {
      return;
    }

    if (newValue !== null) {
      onChange(formatISO(toMidnight(newValue)));
    } else {
      onChange("");
    }
  };

  return (
    <DatePicker
      label={label}
      mask={getCurrentLocale().dateFormatMap}
      value={value}
      onChange={handleOnChange}
      InputProps={{ id, name }}
      renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
    />
  );
}

ExperimentalDateInput.defaultProps = {
  isValid: noopIsValid,
};

export const ExperimentalDateInputWithAppContext = (props: Props) => {
  return (
    <AppContextProviders>
      <ExperimentalDateInput {...props} />
    </AppContextProviders>
  );
};
