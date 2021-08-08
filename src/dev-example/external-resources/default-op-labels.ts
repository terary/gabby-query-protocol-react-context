/* eslint-disable import/no-extraneous-dependencies */
// This file is intended to stay with the controls
// The other opLabel file 'operator-labels.ts' is

import { TPredicateOperatorLabels } from "../../lib/GabbyQueryProtocolContext";

// a dev/debug file.. I18N sorta thing.
const defaultOpLabels: TPredicateOperatorLabels = {
  $and: "All of these",
  $anyOf: "Any Of",
  $empty: "Is Empty",
  $eq: "Equals",
  $gt: "Greater Than",
  $gte: "Greater Than Equal",
  $isnull: "Is Null",
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
export default defaultOpLabels;
