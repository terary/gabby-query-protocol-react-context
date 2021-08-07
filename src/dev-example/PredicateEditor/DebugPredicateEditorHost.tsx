/* eslint-disable import/prefer-default-export */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-empty-function */
import { queryHelpers } from "@testing-library/react";
import React, { useState } from "react";
import type { TPredicateProperties } from "gabby-query-protocol-lib";
import { PredicateEditor } from ".";
import type { TGabbyQueryProtocolContextType } from "../../lib/GabbyQueryProtocolContext";

// import { GabbyQueryProtocolContext } from "../../lib/GabbyQueryProtocolContext";
import { GabbyQueryProtocolContext } from "../../lib/GabbyQueryProtocolContext";

const noop = () => {};

interface Props {
  initialPredicate?: TPredicateProperties;
  onCancel?: () => void;
  onFinish?: (revised: TPredicateProperties) => void;
}

export const DebugPredicateEditorHost = ({
  initialPredicate = undefined,
  onCancel = noop,
  onFinish = noop,
}: Props): JSX.Element => {
  const [addPredicateMessage, setAddPredicateMessage] = useState("");
  const { subjectDictionary } = React.useContext(
    GabbyQueryProtocolContext
  ) as TGabbyQueryProtocolContextType;

  const [selectedSubject, setSelectedSubject] = useState({
    ...subjectDictionary.getDefaultSubject(),
    ...initialPredicate,
  });

  const handleSelectedSubjectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = ev.target.value;
    const subjectProps = subjectDictionary.getSubject(subjectId);

    const x = { ...selectedSubject, ...{ ...subjectProps } };
    setSelectedSubject(x);
  };

  const handleFinish = (predicate: TPredicateProperties) => {
    setAddPredicateMessage(`Add Predicate: ${JSON.stringify(predicate)}`);
    onFinish({
      ...predicate,
      subjectId: selectedSubject.subjectId,
    });
  };
  const SubjectSelector = () => {
    return (
      <select value={selectedSubject.subjectId} onChange={handleSelectedSubjectChange}>
        {Object.entries(subjectDictionary.getAllSubjects()).map(
          ([subjectId, subject]) => {
            return (
              <option value={subjectId} key={subjectId}>
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  subject.defaultLabel
                }
              </option>
            );
          }
        )}
      </select>
    );
  };

  return (
    <>
      <SubjectSelector />
      <PredicateEditor
        initialPredicate={initialPredicate}
        subjectId={selectedSubject.subjectId}
        onFinish={handleFinish}
        onCancel={onCancel}
      />
      <br />
      new/update predicate: {addPredicateMessage}
      <br />
    </>
  );
};
