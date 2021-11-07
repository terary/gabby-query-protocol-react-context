/* eslint-disable import/prefer-default-export */
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TValueLabelList } from "gabby-query-protocol-lib";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(theme: Theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

type ValueType = (number | string)[]; // do not export.  If export is necessary change name T... (no "Type"), the convention

interface IProps<T> {
  isMultiple: boolean;
  labelText: string;
  options: TValueLabelList;
  uniqueControlId: string;
  value: T;
  onChange: (value: T) => void;
}

export function SelectInputGeneric<T extends (string | number) | (string | number)[]>({
  isMultiple,
  labelText,
  options,
  uniqueControlId,
  value,
  onChange,
}: IProps<T>): JSX.Element {
  const theme = useTheme();
  const labelId = `${uniqueControlId}-label`;
  const handleChangeScalar = (event: SelectChangeEvent<string | number>) => {
    const {
      target: { value: inputValue },
    } = event;
    onChange(inputValue as T);
  };

  const handleChangeArray = (event: SelectChangeEvent<(string | number)[]>) => {
    const {
      target: { value: inputValue },
    } = event;

    let newValue: (string | number)[];
    newValue = inputValue as (string | number)[];

    // - snippet left in, but causes issues with coverage
    //   no way to test for our purposes, we never expect the autoComplete property to be set
    // ------------------------
    // On autofill we get a the stringified value.
    // if (Array.isArray(inputValue)) {
    //   newValue = inputValue;
    // } else {
    //   newValue = inputValue.split(",");
    // }
    onChange(newValue as T);
  };

  const handleChange = (event: SelectChangeEvent<T>) => {
    if (isMultiple) {
      handleChangeArray(event as SelectChangeEvent<(number | string)[]>);
    } else {
      handleChangeScalar(event as SelectChangeEvent<number | string>);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id={labelId}>{labelText}</InputLabel>
      <Select
        labelId={labelId}
        id={uniqueControlId}
        multiple={isMultiple}
        value={value as T}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} style={getStyles(theme)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
