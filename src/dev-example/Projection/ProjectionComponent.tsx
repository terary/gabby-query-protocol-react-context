/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import { useProjectionSubjects } from "../import-from-lib";
import type { TProjectionProperties } from "../import-from-lib";
import { ProjectedSubjectWithControls } from "./ProjectedSubjectWithControls";
import { ProjectedSubjectSimple } from "./ProjectedSubjectSimple";

import { ProjectionSubjectCreator } from "./ProjectionCreator";
import styles from "../componentized.module.css";

// const sortedByProperty = (
//   projection: TProjectionDictionary,
//   property: keyof TProjectionProperties
// ) => {
//   return Object.assign(
//     {},
//     ...Object.entries(projection)
//       .sort(([xKey, xObject], [yKey, yObject]) => {
//         // equality check not necessary for our purposes
//         return xObject[property] > yObject[property] ? 1 : -1;
//       })
//       .map(([key, value]) => {
//         return { [key]: value };
//       })
//   );
// };

/* eslint-disable import/prefer-default-export */
export const ProjectionComponent = (): JSX.Element => {
  const {
    addProjectionItem,
    getProjectionOrderByProperty,
    getColumnOrderedProjectionDictionary,
    projectionAsJson,
    removeProjectionItem,
  } = useProjectionSubjects();

  const projection = getColumnOrderedProjectionDictionary();
  // const sortedBySubjectId = sortedByProperty(projection, "label");
  const sortedBySubjectId = getProjectionOrderByProperty("label");
  const handleAddSubject = (newProjectionItem: TProjectionProperties) => {
    addProjectionItem(newProjectionItem);
  };

  const handleRemoveProjectionSubjection = (projectionId: string) => {
    removeProjectionItem(projectionId);
  };

  return (
    <div>
      <h3>This is the Projection</h3>
      <p>
        Layout is intentionally ugly. The objective here is to demonstrate functionality.
      </p>
      <ProjectionSubjectCreator onFinish={handleAddSubject} />
      <br />
      <div className={styles.projectionContainerSimple}>
        {Object.keys(projection).map((projectionKey) => {
          return <ProjectedSubjectSimple projectionKey={projectionKey} />;
        })}
      </div>
      <br />
      <div className={styles.projectionContainer}>
        {Object.keys(sortedBySubjectId).map((projectionKey) => {
          return (
            <ProjectedSubjectWithControls
              projectionKey={projectionKey}
              onRemoveItem={() => {
                handleRemoveProjectionSubjection(projectionKey);
              }}
            />
          );
        })}
      </div>
      Projection JSON: {JSON.stringify(projectionAsJson)}
    </div>
  );
};
