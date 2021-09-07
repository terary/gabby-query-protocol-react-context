/* eslint-disable import/prefer-default-export */
import type { TPredicateOperatorLabels } from "./index";

export const defaultOperatorLabels: TPredicateOperatorLabels = {
  $and: "All of these",
  $anyOf: "Any Of",
  $empty: "Is Empty",
  $eq: "Equals",
  $gt: "Greater Than",
  $gte: "Greater Than Equal",
  $isNull: "Is Null",
  $lt: "Less Than",
  $lte: "Less Than Equal",
  $like: "Contains",
  $oneOf: "One Of",
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",
  $or: "Any of these",
};
