/* eslint-disable import/no-extraneous-dependencies */
// This file is intended to stay with the controls
// The other opLabel file 'operator-labels.ts' is

import { TPredicateOperatorLabels } from "../../lib/GabbyQueryProtocolContext";

// a dev/debug file.. I18N sorta thing.
const defaultOpLabels: TPredicateOperatorLabels = {
  $eq: "Equals",
  $gt: "Greater Than",
  $gte: "Greater Than Equal",
  $lt: "Less Than",
  $lte: "Less Than Equal",
  $like: "Contains",
  $anyOf: "Any Of",
  $oneOf: "One Of",
  $and: "All of these",
  $or: "Any of these",
};
export default defaultOpLabels;
