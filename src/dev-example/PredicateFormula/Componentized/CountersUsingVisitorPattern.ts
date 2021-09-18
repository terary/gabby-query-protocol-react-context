/* eslint-disable import/prefer-default-export */
import { PredicateFormulaEditor, PredicateTreeVisitors } from "../../../lib";

/**
 * Visitor pattern very useful for PredicateTree.
 * But no practical purpose for our demonstration.
 */

type countNodesReturnType = {
  // break [T]CamelCase because type should not be exported
  all: number;
  branches: number;
  leafs: number;
};

export const CountersUsingVisitorPattern = (
  predicateFormula: PredicateFormulaEditor
): countNodesReturnType => {
  const allNodeVisitor = new PredicateTreeVisitors.PredicateIdsAll();
  const branchNodeVisitor = new PredicateTreeVisitors.PredicateIdsBranches();
  const leafNodeVisitor = new PredicateTreeVisitors.PredicateIdsLeafs();

  predicateFormula.predicateTree.acceptVisitor(allNodeVisitor);
  predicateFormula.predicateTree.acceptVisitor(branchNodeVisitor);
  predicateFormula.predicateTree.acceptVisitor(leafNodeVisitor);

  return {
    all: allNodeVisitor.predicateIds.length,
    branches: branchNodeVisitor.predicateIds.length,
    leafs: leafNodeVisitor.predicateIds.length,
  };
};
