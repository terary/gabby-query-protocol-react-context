/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { TProjectionProperties } from "gabby-query-protocol-projection";
import { useProjectionSubjects } from "../../lib/GabbyQueryProtocolContext";

import { ProjectedSubject } from "./ProjectedSubject";
import { ProjectionSubjectCreator } from "./ProjectionCreator";

/* eslint-disable import/prefer-default-export */
export const ProjectionComponent = (): JSX.Element => {
  const { projectionList, addProjectionItem, removeProjectionItem } =
    useProjectionSubjects();

  const [showProjectableCreator, setShowProjectableCreator] = React.useState(true);
  // will this cause 10,000 re-render?
  // does it cause re-render because projectionList() returns a new control every time?
  const projection = projectionList();

  const handleAddSubject = (newProjectionItem: TProjectionProperties) => {
    addProjectionItem(newProjectionItem);
    setShowProjectableCreator(false);
  };

  const handleRemoveProjectionSubjection = (projectionId: string) => {
    removeProjectionItem(projectionId);
  };

  return (
    <div>
      <h3>This is the Projection</h3>
      <span>
        Need to make/find common state for this component? individual subject update as
        expected but not able to update the whole thing (columnOrder should adjust)
      </span>
      <button
        onClick={() => {
          setShowProjectableCreator(true);
        }}
        type="button"
      >
        <span style={{ color: "green" }}>&#8853;</span>
      </button>
      <br />
      {showProjectableCreator && (
        <ProjectionSubjectCreator
          onFinish={handleAddSubject}
          onCancel={() => {
            setShowProjectableCreator(false);
          }}
        />
      )}
      <br />
      {Object.keys(projection).map((projectionKey) => {
        return (
          <React.Fragment key={projectionKey}>
            <ProjectedSubject projectionKey={projectionKey} />
            <button
              onClick={() => {
                handleRemoveProjectionSubjection(projectionKey);
              }}
              type="button"
            >
              <span style={{ color: "red" }}>&#10006;</span>
            </button>
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
};
