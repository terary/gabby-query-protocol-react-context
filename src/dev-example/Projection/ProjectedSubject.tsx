/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */

import { useState } from "react";
import { useProjectionSubjectProperties } from "../../lib";

// TProjectionProperties
interface Props {
  // subject: TProjectionProperties;
  projectionKey: string;
}

const style = {
  display: "inline",
  border: "1px solid black",
  backgroundColor: "pink",
  margin: "3px",
  padding: "3px",
  borderRadius: "3px",
};
export const ProjectedSubject = ({ projectionKey }: Props): JSX.Element => {
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  const { projectedSubject: subject, updateProjectionSubject } =
    useProjectionSubjectProperties(projectionKey);

  const handleSortOrderClick = () => {
    let newSortOrder: number;
    if (subject.sortOrder === 1) {
      newSortOrder = -1;
    } else {
      newSortOrder = subject.sortOrder + 1;
    }
    updateProjectionSubject({ sortOrder: newSortOrder });
  };

  const handleColumnOrderIncrement = () => {
    updateProjectionSubject({
      columnOrder: parseInt(`${subject.columnOrder}`, 10) + 1,
    });
  };
  const handleColumnOrderDecrement = () => {
    updateProjectionSubject({
      columnOrder: parseInt(`${subject.columnOrder}`, 10) - 1,
    });
  };

  const ColumnOrder = () => {
    return (
      <>
        <button type="button" onClick={handleColumnOrderDecrement}>
          -
        </button>
        {subject.columnOrder}
        <button type="button" onClick={handleColumnOrderIncrement}>
          +
        </button>
      </>
    );
  };

  const SortButton = (symbolCode: number) => {
    return (
      <button type="button" onClick={handleSortOrderClick}>
        <span>{String.fromCharCode(symbolCode)}</span>
      </button>
    );
  };

  const SortElement = () => {
    switch (subject.sortOrder) {
      case 1:
        return SortButton(0x02227);
      case -1:
        return SortButton(0x02228);
      default:
        return SortButton(0x02043);
    }
  };
  const handleOpenForEdit = () => {
    setIsOpenForEdit(true);
  };
  const handleCloseForEdit = () => {
    setIsOpenForEdit(false);
  };
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectionSubject({ label: e.currentTarget.value });
  };

  const ReadOnlyLabel = () => {
    return (
      <span>
        {subject.label}
        <button type="button" onClick={handleOpenForEdit}>
          ...
        </button>
      </span>
    );
  };
  const EditableLabel = () => {
    return (
      <span>
        <input value={subject.label} onChange={handleLabelChange} />
        <button type="button" onClick={handleCloseForEdit}>
          ...
        </button>
      </span>
    );
  };

  return (
    <div style={style}>
      <ColumnOrder />
      {isOpenForEdit && <EditableLabel />}
      {!isOpenForEdit && <ReadOnlyLabel />}({subject.subjectId}){subject.columnOrder}
      {subject.sortOrder}
      <SortElement />
    </div>
  );
};
