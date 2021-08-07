/* eslint-disable no-unused-expressions */
// cSpell:ignore Componentized
/* eslint-disable import/prefer-default-export */
import * as React from "react";
import type { TPredicateProperties } from "gabby-query-protocol-lib";
// TODO -tmc- this should be coming form ../../lib not ../../lib/GabbyQueryProtocolContext
import { useJunctionProperties } from "../../lib/GabbyQueryProtocolContext";
import styles from "./componentized.module.css";
import defaultOpLabels from "../external-resources/default-op-labels";

export const BranchViewer = ({ nodeId, children }: BranchViewerProps): JSX.Element => {
  const {
    queryPredicate,
    makeEmptyPredicate,
    appendPredicate,
    removeMe,
    setDisjunction,
    setConjunction,
  } = useJunctionProperties(nodeId);

  const expandNode = () => {
    appendPredicate(makeEmptyPredicate());
    // makeEmptyPredicate()
    // appendPredicate(makeFakeChild(nodeId));
  };
  const handleRemoveMe = () => {
    removeMe();
  };
  const isConjunction = () => queryPredicate.operator === "$and";

  const handleToggleJunction = () => {
    isConjunction() ? setDisjunction() : setConjunction();
  };

  const JunctionSwitcherButton = () => {
    const label = `${defaultOpLabels[queryPredicate.operator]} (${
      queryPredicate.operator
    })`;
    return (
      <button type="button" onClick={handleToggleJunction}>
        {label}
      </button>
    );
  };
  const containerStyle = () => {
    if (isConjunction()) {
      return `${styles.BranchContainerConjunction}`;
    }
    return `${styles.BranchContainerDisjunction}`;
  };

  return (
    <div className={containerStyle()}>
      <div className={styles.BranchButtonContainer}>
        <button type="button" onClick={expandNode}>
          +
        </button>
        <JunctionSwitcherButton />
        <button type="button" onClick={handleRemoveMe}>
          X
        </button>
        <br />
      </div>
      {children}
    </div>
  );
};
