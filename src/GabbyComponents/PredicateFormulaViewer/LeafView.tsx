/* eslint-disable import/prefer-default-export */
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import { IconButtonEdit } from "../common/IconButtonEdit";
import { IconButtonsAdd } from "../common/IconButtonsAdd";
import { useApplicationUtilities } from "../../Application";

import type {
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";
//import { predicateFormulaContextUtils } from "../../GabbyQueryProtocol/PredicateFormula";
import { PredicateEditorPopover } from "../PredicateFormulaEditor";
import { IconButtonRemove } from "../common/IconButtonRemove";

import { PaperItem } from "./common-utilities";

import { PredicateFormulaEditorContextHooks } from "../../GabbyQueryProtocol";
const { usePredicateProperties, usePredicateTreeUtilities } =
  PredicateFormulaEditorContextHooks;

export const LeafView = ({
  predicateId,
}: // numberOfChildren,
// childIndex,
{
  predicateId: string;
  // numberOfChildren: number;
  // childIndex: number;
}) => {
  const currentLocale = useApplicationUtilities().getCurrentLocale();

  const [isOpenForEdit, setIsOpenForEdit] = React.useState(false);
  const [isOpenForNew, setIsOpenForNew] = React.useState(false);
  const editorContainerRef = React.useRef(null);

  const {
    appendPredicate,
    getPredicateLeafProperties,
    isRoot,
    updateCurrentPredicate,
    removeCurrentPredicate,
  } = usePredicateProperties(predicateId);

  const { makeEmptyPredicate, operatorLabels, subjectDictionary } =
    usePredicateTreeUtilities();

  const { predicateProperties } = getPredicateLeafProperties();
  const currentSubject = subjectDictionary.getSubject(predicateProperties.subjectId);

  const handleRemoveClick = () => {
    removeCurrentPredicate();
  };

  const handleFinishEdit = (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => {
    // this should run validator first
    updateCurrentPredicate(predicateProperties);
    setIsOpenForEdit(false);
  };

  const handleFinishNew = (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => {
    // this should run validator first
    appendPredicate(predicateProperties);
    setIsOpenForEdit(false);
    setIsOpenForNew(false);
  };

  const handelOpenForNewClick = () => {
    setIsOpenForNew(true);
  };

  const PredicateEditorWrapper = () => {
    return (
      <PredicateEditorPopover
        id={`${predicateId}-popover-editor`}
        initialPredicate={isOpenForEdit ? predicateProperties : makeEmptyPredicate()}
        isOpen={isOpenForEdit || isOpenForNew}
        onFinish={isOpenForEdit ? handleFinishEdit : handleFinishNew}
        onCancel={() => {
          setIsOpenForEdit(false);
          setIsOpenForNew(false);
        }}
        parentEl={editorContainerRef.current}
      />
    );
  };

  const ControlButtons = () => {
    return (
      <div style={{ width: "100%", display: "inline" }}>
        <div style={{ float: "right", display: "block" }}>
          <IconButtonEdit
            dense
            onClick={() => {
              setIsOpenForEdit(!isOpenForEdit);
            }}
          />
          <IconButtonsAdd dense onClick={handelOpenForNewClick} />
          {!isRoot && <IconButtonRemove dense onClick={handleRemoveClick} />}
        </div>
      </div>
    );
  };

  const PredicateStaticView = () => {
    return (
      <Stack direction="column" spacing={1} alignItems="center" sx={{ height: "100%" }}>
        <ControlButtons />
        <Stack direction="column">
          <span>{currentSubject.defaultLabel}</span>
          <sub>({predicateProperties.subjectId})</sub>
        </Stack>
        <Stack direction="column">
          <span>{operatorLabels[predicateProperties.operator]}</span>
          {currentLocale.languageCode !== "en" && <sub>({predicateProperties.operator})</sub>}
        </Stack>
        <span>{predicateProperties.value}</span>{" "}
      </Stack>
    );
  };

  return (
    <Grid item md direction="row-reverse" ref={editorContainerRef}>
      <PaperItem sx={{ height: "100%", border: "1px solid purple", borderRadius: "5px" }}>
        <PredicateEditorWrapper />
        <PredicateStaticView />
      </PaperItem>
    </Grid>
  );
};
