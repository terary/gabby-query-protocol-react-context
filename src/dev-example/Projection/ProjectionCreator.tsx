/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */

import { useState } from "react";
import type { TProjectionProperties } from "gabby-query-protocol-lib";
import { useProjectionProperties } from "../../lib/GabbyQueryProtocolContext";
// import type { TProjectableSubjectProperties, TProjectionProperties } from "../../lib";

// type NewProjectableType = TProjectableSubjectProperties & { subjectId: string };

interface Props {
  onCancel: () => void;
  onFinish: (newProjection: TProjectionProperties) => void;
}
export const ProjectionSubjectCreator = ({ onCancel, onFinish }: Props) => {
  const { projectableSubjects, addProjectionItem } = useProjectionProperties();
  const [newSubject, setNewSubject] = useState({} as TProjectionProperties);

  const handleSubjectIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subjectId = event.currentTarget.value;
    const subject = projectableSubjects.getSubjectById(subjectId);
    setNewSubject({
      subjectId,
      label: subject.defaultLabel,
      sortOrder: 1,
      columnOrder: 3,
    });
  };
  const handleInputChange = (
    propertyName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.value;
    setNewSubject({ ...newSubject, ...{ [propertyName]: newValue } });
  };
  const handleFinish = () => {
    onFinish(newSubject);
  };

  return (
    <div>
      subject:{" "}
      <select value={newSubject.subjectId} onChange={handleSubjectIdChange}>
        {projectableSubjects.getSubjectIds().map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (subjectId) => {
            const subject = projectableSubjects.getSubjectById(subjectId);
            return (
              <option key={subjectId} value={subjectId}>
                {subject.defaultLabel}
              </option>
            );
          }
        )}
      </select>
      <input
        value={newSubject.label}
        onChange={(e) => {
          handleInputChange("label", e);
        }}
      />
      <input
        value={newSubject.columnOrder}
        type="number"
        onChange={(e) => {
          handleInputChange("columnOrder", e);
        }}
      />
      <button onClick={handleFinish} type="button">
        <span style={{ color: "green" }}>&#10004;</span>
      </button>
      <button onClick={onCancel} type="button">
        <span style={{ color: "red" }}>&#10006;</span>
      </button>
    </div>
  );
};
