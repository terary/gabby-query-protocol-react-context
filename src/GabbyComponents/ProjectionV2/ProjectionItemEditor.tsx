import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";

import { ProjectionContextHooks } from "../../GabbyQueryProtocol";

import { TProjectionProperties } from "gabby-query-protocol-projection";
import { NumberInput } from "../PredicateFormulaEditor/input/NumberInput";
import { ButtonsFinishCancelIcon } from "../common/ButtonsFinishCancelIcon";
import { ButtonsFinishCancelText } from "../common/ButtonsFinishCancelText";
import { TProjectionItemProperties } from "gabby-query-protocol-projection/dist/ProjectionEditor";
import { StringInput } from "../PredicateFormulaEditor/input/StringInput";
import { useProjectionUtilities } from "../../GabbyQueryProtocol/Projections/hooks/useProjectionUtilities";
const { useProjectionSubjects } = ProjectionContextHooks;

const nextSortOrder = (currentSortOrder: number) => {
  switch (currentSortOrder) {
    case -1:
      return 0;
    case 0:
      return 1;
    case 1:
      return -1;
    default:
      return 0;
  }
};

const sortLabelText = (currentSortOrder: number) => {
  switch (currentSortOrder) {
    case -1:
      return "Descending";
    case 0:
      return "N/A";
    case 1:
      return "Ascending";
    default:
      return 0;
  }
};

type Props = {
  buttonStyle?: "iconCancelFinishButtons" | "textCancelFinishButtons";
  initialProjectionItem: TProjectionItemProperties;
  onFinish: (newProjectionItem: TProjectionProperties) => void;
  onCancel: () => void;
};

export const ProjectionItemEditor = ({
  buttonStyle,
  initialProjectionItem,
  onFinish,
  onCancel,
}: Props) => {
  const { t } = useTranslation();
  const [newProjectionItem, setNewProjectionItem] =
    useState<TProjectionItemProperties>(initialProjectionItem);
  // const subjectionDictionary = useProjectionSubjects().getProjectableSubjectDictionary();
  const subjectionDictionary = useProjectionUtilities().getProjectableSubjectDictionary();

  const projectableSubjectIds = subjectionDictionary.getSubjectIds();

  const handleSubjectSelectChange = (event: SelectChangeEvent, child: any) => {
    const subjectId = event.target.value as string;
    const projectableSubject = subjectionDictionary.getSubjectById(subjectId);
    setNewProjectionItem({
      ...newProjectionItem,
      ...{ subjectId, label: projectableSubject.defaultLabel },
    });
  };

  const handleSortOrderClick = () => {
    setNewProjectionItem({
      ...newProjectionItem,
      ...{ sortOrder: nextSortOrder(newProjectionItem.sortOrder) },
    });
  };

  const handleLabelTextChange = (newText: string) => {
    setNewProjectionItem({
      ...newProjectionItem,
      ...{ label: newText },
    });
  };

  const handleColumnOrderChange = (columnOrder: number | string) => {
    const effectiveColumnOrder = isNaN(parseInt("" + columnOrder))
      ? 0
      : parseInt("" + columnOrder);

    setNewProjectionItem({
      ...newProjectionItem,
      ...{ columnOrder: columnOrder as number },
    });
  };

  const handleFinishClick = () => {
    onFinish(newProjectionItem);
  };

  const SubjectSelectFormControl = () => {
    return (
      <FormControl variant="outlined" sx={{ width: "100%", marginTop: "10px" }}>
        <InputLabel htmlFor="editor-select-subject">{t("Column ID")}</InputLabel>
        <Select
          inputProps={{
            name: "editor-select-subject",
            id: "editor-select-subject",
          }}
          native
          label={t("Column ID")}
          variant="outlined"
          onChange={handleSubjectSelectChange}
          value={newProjectionItem.subjectId}
        >
          {projectableSubjectIds.map((projectableId, idx) => {
            const projectableSubject = subjectionDictionary.getSubjectById(projectableId);
            return (
              <option key={projectableId} value={projectableId}>
                {projectableSubject.defaultLabel || projectableId}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    // TODO - *tmc* use theme color
    <div style={{ border: "1px solid black;" }}>
      {t("Project Item Editor")}
      <Stack spacing={3}>
        <SubjectSelectFormControl />
        <StringInput
          id="new-projection-column-label"
          name="new-projection-column-label"
          onChange={handleLabelTextChange}
          labelText="Column Headers"
          value={newProjectionItem.label}
        />
        <NumberInput
          datatype="integer"
          id="new-projection-column"
          label="Column Order"
          name="new-projection-column"
          onChange={handleColumnOrderChange}
          value={newProjectionItem.columnOrder}
        />
        <Button variant="outlined" onClick={handleSortOrderClick}>
          {t("Sort Order:")} {sortLabelText(newProjectionItem.sortOrder)}
        </Button>
        {buttonStyle === "iconCancelFinishButtons" && (
          <ButtonsFinishCancelIcon onFinish={handleFinishClick} onCancel={onCancel} />
        )}
        {buttonStyle === "textCancelFinishButtons" && (
          <ButtonsFinishCancelText onFinish={handleFinishClick} onCancel={onCancel} />
        )}
      </Stack>
    </div>
  );
};
