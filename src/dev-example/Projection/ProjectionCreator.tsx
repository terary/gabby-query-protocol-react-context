/* eslint-disable import/prefer-default-export */
import { useState } from "react";
import type { TProjectionProperties } from "../import-from-lib";
import { useProjectionSubjects } from "../import-from-lib";

interface Props {
  onFinish: (newProjection: TProjectionProperties) => void;
}

export const ProjectionSubjectCreator = ({ onFinish }: Props): JSX.Element => {
  //
  const { projectableSubjects } = useProjectionSubjects();
  const [newSubject, setNewSubject] = useState({} as TProjectionProperties);

  const handleSubjectIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select value={newSubject.subjectId} onChange={handleSubjectIdChange}>
        <option value={newSubject.subjectId} selected disabled>
          Select Column
        </option>
        {projectableSubjects.getSubjectIds().map((subjectId) => {
          const subject = projectableSubjects.getSubjectById(subjectId);
          return (
            <option key={subjectId} value={subjectId}>
              {subject.defaultLabel}
            </option>
          );
        })}
      </select>
      <input
        value={newSubject.label}
        onChange={(e) => {
          handleInputChange("label", e);
        }}
        placeholder="Column Label"
      />
      <input
        value={newSubject.columnOrder}
        type="number"
        onChange={(e) => {
          handleInputChange("columnOrder", e);
        }}
        placeholder="Column position"
      />
      {newSubject.subjectId && (
        <button onClick={handleFinish} type="button">
          <span style={{ color: "green" }}>&#10004; Add Column</span>
        </button>
      )}
    </div>
  );
};
