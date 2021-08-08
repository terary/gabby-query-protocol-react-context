// cspell:disable
// import type { TPredicateOperatorLabels } from "gabby-query-protocol-lib";
import { TPredicateOperatorLabels } from "../../lib/GabbyQueryProtocolContext";

const EN: TPredicateOperatorLabels = {
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
const ES: TPredicateOperatorLabels = {
  $and: "Todos estos",
  $anyOf: "Cualquiera de",
  $empty: "Is Empty",
  $eq: "Es igual a",
  $gt: "Mayor que",
  $gte: "Mayor que igual",
  $isnull: "Is Null",
  $lt: "Menor que",
  $lte: "Menor que igual",
  $like: "Contiene",
  $oneOf: "Uno de",
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",
  $or: "Cualquiera de estos",
};

const TH: TPredicateOperatorLabels = {
  $and: "ทั้งหมดนี้",
  $anyOf: "อันใดอันหนึ่ง",
  $empty: "Is Empty",
  $eq: "เท่ากับ",
  $gt: "มากกว่า",
  $gte: "มากกว่าเท่ากับ",
  $isnull: "Is Null",
  $lt: "น้อยกว่า",
  $lte: "น้อยกว่าเท่ากับ",
  $like: "มี",
  $oneOf: "หนึ่งใน",
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",
  $or: "ใดๆ เหล่านี้",
};
const AR: TPredicateOperatorLabels = {
  $and: "كل هذه",
  $anyOf: "اي من",
  $empty: "Is Empty",
  $eq: "يساوي",
  $gt: "أكبر من",
  $gte: "أكبر من يساوي",
  $isnull: "Is Null",
  $lt: "أقل من",
  $lte: "أقل من يساوي",
  $like: "يحتوي على",
  $oneOf: "واحد من",
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",

  $or: "أي منهم",
};

const SymbolsTypable: TPredicateOperatorLabels = {
  $and: "AND",
  $anyOf: "Any Of",
  $empty: "Is Empty",
  $eq: "=",
  $gt: ">",
  $gte: ">=",
  $isnull: "Is Null",
  $lt: "<",
  $lte: "<=",
  $like: "=~",
  $oneOf: "One Of",
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",

  $or: "OR",
};
const SymbolsEntities: TPredicateOperatorLabels = {
  // https://dev.w3.org/html5/html-author/charref
  $anyOf: String.fromCharCode(0x02286), // ⊆
  $empty: "Is Empty",

  $eq: "=",
  $gt: ">",
  $gte: String.fromCharCode(0x02265), // ≥
  $isnull: "Is Null",
  $lt: "<",
  $lte: String.fromCharCode(0x02264), // ≤
  $like: String.fromCharCode(0x02243), // ≃
  $oneOf: String.fromCharCode(0x02203), // ∃
  $and: String.fromCharCode(0x02227), // ∧
  $nand: "Not And",
  $nanyOf: "Not Any",
  $ne: "Not Equal",
  $nor: "Not Or",
  $or: String.fromCharCode(0x02228), // ∨
};

export { SymbolsEntities, SymbolsTypable, AR, EN, ES, TH };

// probably a more eloquent way of doing this but ran out of time.
// export const PREDICATE_OPERATORS = ["$eq", "$gt", "$lt", "$gte", "$lte", "$like", "$in"];
// export const JUNCTION_OPERATORS = ["$and", "$or"];
// export const predefinedLabels = {
//   Symbols,
//   en: Long,
//   "en-US": Long,
//   es: ES,
//   "es-MX": ES,
//   "th-TH": TH,
//   AR,
// };
