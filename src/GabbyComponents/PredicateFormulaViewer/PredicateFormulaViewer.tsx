/* eslint-disable import/prefer-default-export */
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import { predicateFormulaContextUtils } from "../../GabbyQueryProtocol/PredicateFormula";
import { MuxView } from "./MuxView";

import { PredicateFormulaEditorContextHooks } from "../../GabbyQueryProtocol";
const { useJunctionProperties } = PredicateFormulaEditorContextHooks;

type Props = {
  rootPredicateId: string;
};

export function PredicateFormulaViewer({ rootPredicateId }: Props): JSX.Element {
  const { getChildrenIds, isBranchNode } = useJunctionProperties(rootPredicateId);
  const childrenIds = getChildrenIds();

  const SingleNode = () => {
    return <MuxView predicateId={rootPredicateId} numberOfChildren={0} childIndex={0} />;
  };

  const BranchingNode = () => {
    return (
      <MuxView
        predicateId={rootPredicateId}
        numberOfChildren={childrenIds.length}
        childIndex={0}
      />
    );
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} data-predicate-tree="root">
          {isBranchNode ? <BranchingNode /> : <SingleNode />}
        </Grid>
      </Box>
    </>
  );
}
