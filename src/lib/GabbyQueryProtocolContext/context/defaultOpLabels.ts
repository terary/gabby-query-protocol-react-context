/* eslint-disable import/prefer-default-export */
// import type { TPredicateOperatorLabels } from "gabby-query-protocol-lib";
import type { TPredicateOperatorLabels } from "..";

export const defaultOperatorLabels: TPredicateOperatorLabels = {
  $eq: "Equals",
  $gt: "Greater Than",
  $gte: "Greater Than Equal",
  $lt: "Less Than",
  $lte: "Less Than Equal",
  $like: "Contains",
  $anyOf: "Any Of",
  $oneOf: "One Of",
  $and: "All of These",
  $or: "Any of These",
};
