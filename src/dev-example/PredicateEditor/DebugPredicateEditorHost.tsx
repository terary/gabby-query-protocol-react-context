/* eslint-disable import/prefer-default-export */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react";
import { PredicateEditor } from ".";
import type { TGabbyQueryProtocolContextType, TPredicateProperties } from "../../lib";

import { GabbyQueryProtocolContext } from "../../lib";

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
        {subjectDictionary.getSubjectIds().map((subjectId) => {
          const subject = subjectDictionary.getSubject(subjectId);
          return (
            <option value={subjectId} key={subjectId}>
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                subject.defaultLabel
              }
            </option>
          );
        })}
        {/* {Object.entries(subjectDictionary. .getSubjects()).map(([subjectId, subject]) => {
          return (
            <option value={subjectId} key={subjectId}>
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                subject.defaultLabel
              }
            </option>
          );
        })}
        */}
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
