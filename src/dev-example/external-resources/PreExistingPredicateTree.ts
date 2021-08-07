// import { PredicateTree } from '../../lib/GabbyQueryProtocolContext/PredicateTree';
import { PredicateTree } from "gabby-query-protocol-lib";
import type { TPredicateProperties } from "gabby-query-protocol-lib";

const existingTree = new PredicateTree("pTree01", {
  subjectId: "firstname",
  operator: "$eq",
  value: "Component Default Tree",
});
const child0 = {
  subjectId: "firstname",
  operator: "$eq",
  value: "Child A",
} as TPredicateProperties;
const child1 = {
  subjectId: "annualRevenue",
  operator: "$gte",
  value: "Child B",
} as TPredicateProperties;
const grandchild0 = {
  subjectId: "numberOfEmployees",
  operator: "$lt",
  value: "Grandchild A-00",
} as TPredicateProperties;
const grandchild1 = {
  subjectId: "region",
  operator: "$eq",
  value: "Grandchild A-01",
} as TPredicateProperties;

const child0Id = existingTree.appendPredicate(existingTree.rootNodeId, child0);
existingTree.appendPredicate(existingTree.rootNodeId, child1);

existingTree.appendPredicate(child0Id, grandchild0);
existingTree.appendPredicate(child0Id, grandchild1);

existingTree.replacePredicate(child0Id, { operator: "$or" });

export default existingTree;
