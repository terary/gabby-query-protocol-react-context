/* eslint-disable no-unused-vars */
import type {
  TPredicateOperator,
  TPredicateJunctionOperator,
} from "gabby-query-protocol-lib";

export type TPredicateOperatorLabels = {
  [op in TPredicateOperator | TPredicateJunctionOperator]: string;
};
