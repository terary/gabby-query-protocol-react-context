/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";
import type {
  TQueryPredicate,
  TPredicateOperatorLabels,
  TSubjectProperties,
  TPredicateOperator,
  TValueLabelList,
} from "gabby-query-protocol-lib";
// import type {
//   TQueryPredicate,
//   TPredicateOperatorLabels,
//   TSubjectProperties,
//   TPredicateOperator,
//   TValueLabelList,
// } from "../../lib";

interface Props {
  value?: number | string;
  options?: TValueLabelList;
  onChange: (newValue: string | number) => void;
}

const SelectGeneric = ({ value = "", options = [], onChange }: Props): JSX.Element => {
  const handleValueChange = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(ev.target.value);
  };

  // if (
  //   currentPredicate.operator === "$anyOf" ||
  //   currentPredicate.operator === "$oneOf"
  // ) {
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
