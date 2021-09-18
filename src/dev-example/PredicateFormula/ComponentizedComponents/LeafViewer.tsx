/// cspell:ignore componentized
/* eslint-disable import/prefer-default-export */
import * as React from "react";
import type { TPredicateProperties } from "../../../lib";
import { usePredicateProperties } from "../../../lib";
import styles from "../../componentized.module.css";
import { PredicateSubjectSelector } from "../PredicateEditor/PredicateSubjectSelector";

export const LeafViewer = ({ nodeId }: LeafViewerProps): JSX.Element => {
  const {
    appendPredicate,
    makeEmptyPredicate,
    operatorLabels,
    queryPredicate,
    removeMe,
    updateMe,
    validatePredicateProperties,
  } = usePredicateProperties(nodeId);

  const [thisState, setThisState] = React.useState({
    isOpenForEdit: false,
    queryPredicate,
  });

  const handleFinishEdit = (revisedPredicate: TPredicateProperties) => {
    const { hasError, errorMessages } = validatePredicateProperties(revisedPredicate);
    if (hasError) {
      alert("Failed validation. Check console for details");
      console.log("Validation Errors:", errorMessages);
    } else {
      updateMe(revisedPredicate);
      setThisState({
        isOpenForEdit: false,
        ...{ queryPredicate: revisedPredicate },
      });
    }
  };

  const expandNode = () => {
    appendPredicate(makeEmptyPredicate());
  };
  const deleteMe = () => {
    removeMe();
  };
  const toggleIsOpenForEdit = () => {
    setThisState({
      ...thisState,
      ...{ isOpenForEdit: !thisState.isOpenForEdit },
    });
    // setIsOpenForEdit(!isOpenForEdit);
    // queryPredicate = (getPredicateById(nodeId) || {}) as TPredicateProperties;
  };

  const ReadOnlyView = () => (
    <div className={styles.LeafTextContainer}>
      {queryPredicate.subjectId} {operatorLabels[queryPredicate.operator]}{" "}
      {queryPredicate.value}
    </div>
  );

  const EditView = () => (
    <>
      For Edit: {JSON.stringify(queryPredicate)}
      <br />
    </>
  );

  return (
    <div
      style={{
        backgroundColor: "#355070",
        border: "1px solid black",
        borderRadius: "5px",
        margin: "3px",
      }}
    >
      <h3>LeafViewer (Ugly): {nodeId}</h3>
      {!thisState.isOpenForEdit && <ReadOnlyView />}
      {thisState.isOpenForEdit && (
        <PredicateSubjectSelector
          onCancel={toggleIsOpenForEdit}
          onFinish={handleFinishEdit}
          initialPredicate={queryPredicate}
        />
      )}
      <button type="button" onClick={deleteMe}>
        X
      </button>
      <button type="button" onClick={expandNode}>
        +
      </button>
      <button type="button" onClick={toggleIsOpenForEdit}>
        ...
      </button>
    </div>
  );
};
