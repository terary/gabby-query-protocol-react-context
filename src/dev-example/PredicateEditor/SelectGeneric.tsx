/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";

type TValueLabel = {
  value: number | string;
  label: string;
};
type TValueLabelList = TValueLabel[];

interface Props {
  value?: number | string;
  options?: TValueLabelList;
  onChange: (newValue: string | number) => void;
}

const SelectGeneric = ({ value = "", options = [], onChange }: Props): JSX.Element => {
  const handleValueChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(ev.target.value);
  };
  return (
    <select value={value} onChange={handleValueChange}>
      {options.map((opt) => {
        return (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
  // }
};
export default SelectGeneric;
