// cSpell:ignore Componentized
/* eslint-disable import/prefer-default-export */
import * as React from "react";

import { useJunctionProperties } from "../../import-from-lib";
import styles from "../../componentized.module.css";

export const BranchViewer = ({ nodeId, children }: BranchViewerProps): JSX.Element => {
  const {
    appendPredicate,
    makeEmptyPredicate,
    operatorLabels,
    queryPredicate,
    removeMe,
    setDisjunction,
    setConjunction,
  } = useJunctionProperties(nodeId);

  const expandNode = () => {
    appendPredicate(makeEmptyPredicate());
  };

  const handleRemoveMe = () => {
    removeMe();
  };

  const isConjunction = () => queryPredicate.operator === "$and";

  const handleToggleJunction = () => {
    if (isConjunction()) {
      setDisjunction();
    } else {
      setConjunction();
    }
  };

  const JunctionSwitcherButton = () => {
    const label = `${operatorLabels[queryPredicate.operator]} (${
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
