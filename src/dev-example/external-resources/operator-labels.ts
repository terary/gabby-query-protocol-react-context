// cspell:disable
// import type { TPredicateOperatorLabels } from "gabby-query-protocol-lib";
import { TPredicateOperatorLabels } from "../../lib/GabbyQueryProtocolContext";

const EN: TPredicateOperatorLabels = {
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
const ES: TPredicateOperatorLabels = {
  $eq: "Es igual a",
  $gt: "Mayor que",
  $gte: "Mayor que igual",
  $lt: "Menor que",
  $lte: "Menor que igual",
  $like: "Contiene",
  $anyOf: "Cualquiera de",
  $oneOf: "Uno de",
  $and: "Todos estos",
  $or: "Cualquiera de estos",
};

const TH: TPredicateOperatorLabels = {
  $eq: "เท่ากับ",
  $gt: "มากกว่า",
  $gte: "มากกว่าเท่ากับ",
  $lt: "น้อยกว่า",
  $lte: "น้อยกว่าเท่ากับ",
  $like: "มี",
  $anyOf: "อันใดอันหนึ่ง",
  $oneOf: "หนึ่งใน",
  $and: "ทั้งหมดนี้",
  $or: "ใดๆ เหล่านี้",
};
const AR: TPredicateOperatorLabels = {
  $eq: "يساوي",
  $gt: "أكبر من",
  $gte: "أكبر من يساوي",
  $lt: "أقل من",
  $lte: "أقل من يساوي",
  $like: "يحتوي على",
  $anyOf: "اي من",
  $oneOf: "واحد من",
  $and: "كل هذه",
  $or: "أي منهم",
};

const SymbolsTypable: TPredicateOperatorLabels = {
  $eq: "=",
  $gt: ">",
  $gte: ">=",
  $lt: "<",
  $lte: "<=",
  $like: "=~",
  $oneOf: "One Of",
  $anyOf: "Any Of",
  $and: "AND",
  $or: "OR",
};
const SymbolsEntities: TPredicateOperatorLabels = {
  // https://dev.w3.org/html5/html-author/charref
  $eq: "=",
  $gt: ">",
  $gte: String.fromCharCode(0x02265), // ≥
  $lt: "<",
  $lte: String.fromCharCode(0x02264), // ≤
  $like: String.fromCharCode(0x02243), // ≃
  $oneOf: String.fromCharCode(0x02203), // ∃
  $anyOf: String.fromCharCode(0x02286), // ⊆
  $and: String.fromCharCode(0x02227), // ∧
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
