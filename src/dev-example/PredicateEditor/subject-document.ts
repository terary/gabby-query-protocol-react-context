/* eslint-disable import/prefer-default-export */
// import type { TSubjectDocument } from "gabby-query-protocol-lib";
import type { TPredicateSubjectDictionary } from "gabby-query-protocol-lib";

const regionsList = [
  { label: "US West", value: "US-WEST" },
  { label: "US East", value: "US-EAST" },
  { label: "US South", value: "US-SOUTH" },
  { label: "US North", value: "US-NORTH" },
];
const fruitList = [
  { label: "Apples", value: "APPLE001" },
  { label: "Grapes", value: "GRAPE001" },
  { label: "Oranges", value: "ORANGE001" },
];
const numberList = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 },
];

export const subjectsDocument: TPredicateSubjectDictionary = {
  firstname: {
    validOperators: { $eq: true, $gt: true, $like: true },
    datatype: "string",
    defaultLabel: "First Name",
  },
  lastname: {
    validOperators: { $eq: true, $gt: true, $like: true },
    datatype: "string",
    defaultLabel: "Last Name",
  },
  annualRevenue: {
    validOperators: { $eq: true, $gt: true, $gte: true, $lt: true, $lte: true },
    datatype: "decimal",
    defaultLabel: "Annual Revenue",
  },
  numberOfEmployees: {
    validOperators: { $eq: true, $gt: true, $gte: true, $lt: true, $lte: true },
    datatype: "integer",
    defaultLabel: "Number of Employees",
  },
  region: {
    validOperators: { $eq: true, $anyOf: { optionList: regionsList } },
    datatype: "string",
    defaultLabel: "Region",
  },
  favoriteFruit: {
    validOperators: { $eq: true, $oneOf: { optionList: fruitList } },
    datatype: "string",
    defaultLabel: "Favorite Fruit",
  },
  favoriteNumber: {
    validOperators: { $eq: true, $oneOf: { optionList: numberList } },
    datatype: "string",
    defaultLabel: "Favorite Number",
  },

  startDate: {
    validOperators: { $eq: true, $gt: true, $gte: true, $lt: true, $lte: true },
    datatype: "datetime",
    defaultLabel: "Start Date",
  },
};
