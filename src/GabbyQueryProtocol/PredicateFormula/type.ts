/* eslint-disable no-unused-vars */
import type {
  TPredicateOperator,
  TPredicateJunctionOperator,
  TPredicatePropertiesArrayValue,
  TPredicateProperties,
} from "gabby-query-protocol-lib";

export type TPredicatePropertiesGeneric =
  | TPredicateProperties
  | TPredicatePropertiesArrayValue;

export type TPredicateOperatorLabels = {
  [op in TPredicateOperator | TPredicateJunctionOperator]: string;
};
