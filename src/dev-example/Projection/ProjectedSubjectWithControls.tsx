/* eslint-disable import/prefer-default-export */

import { useProjectionSubjectProperties } from "../../lib";
import styles from "../componentized.module.css";

interface Props {
  projectionKey: string;

  // because this is a collection operation (remove item)
  // it gets passed in as callback.
  // Although it should come from useProjectionSubjectProperties
  onRemoveItem: () => void;
}
export const ProjectedSubjectWithControls = ({
  projectionKey,
  onRemoveItem,
}: Props): JSX.Element => {
  //
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

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectionSubject({ label: e.currentTarget.value });
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

  const SortButton = (buttonText: string) => {
    return (
      <button type="button" onClick={handleSortOrderClick}>
        <span>{buttonText}</span>
      </button>
    );
  };
  const SortElement = () => {
    switch (subject.sortOrder) {
      case 1:
        return SortButton("ASC");
      case -1:
        return SortButton("DESC");
      default:
        return SortButton("-");
    }
  };

  const RemoveButton = () => {
    return (
      <button onClick={onRemoveItem} type="button">
        <span style={{ color: "red" }}>&#10006;</span>
      </button>
    );
  };
  return (
    <div className={styles.projectionItemWithControls}>
      <table>
        <tr>
          <td>Column Label: </td>
          <td>
            <input value={subject.label} onChange={handleLabelChange} />
          </td>
        </tr>
        <tr>
          <td>SubjectId:</td>
          <td>{subject.subjectId}</td>
        </tr>
        <tr>
          <td>Column Order:</td>
          <td>
            <ColumnOrder />
          </td>
        </tr>
        <tr>
          <td>Sort Order:</td>
          <td>{subject.sortOrder}</td>
        </tr>
        <tr>
          <td>Sort Element</td>
          <td>
            <SortElement />
          </td>
        </tr>
        <tr>
          <td>Remove:</td>
          <td>
            <RemoveButton />
          </td>
        </tr>
      </table>
    </div>
  );
};
