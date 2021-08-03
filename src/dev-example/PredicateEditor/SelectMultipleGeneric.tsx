/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import type {
  TQueryPredicate,
  TPredicateOperatorLabels,
  TSubjectProperties,
  TPredicateOperator,
  TValueLabelList,
} from "gabby-query-protocol-lib";

interface Props {
  value?: number | string;
  options?: TValueLabelList;
  onChange: (newValue: (string | number)[]) => void;
}

const SelectMultipleGeneric = ({
  value = "",
  options = [],
  onChange,
}: Props): JSX.Element => {
  const handleValueChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    //    console.log(ev.target.value);
    const values = Array.from(ev.target.selectedOptions, (option) => option.value);
    console.log("values", values);
    onChange(values);
  };

  // if (
  //   currentPredicate.operator === "$anyOf" ||
  //   currentPredicate.operator === "$oneOf"
  // ) {
  return (
    <select value={value} onChange={handleValueChange} multiple>
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
export default SelectMultipleGeneric;
