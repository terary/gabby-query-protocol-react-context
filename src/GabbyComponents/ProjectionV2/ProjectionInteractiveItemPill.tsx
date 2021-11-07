import Chip from "@mui/material/Chip";
import { IconButtonRemove } from "../common/IconButtonRemove";
import { AscDesIconButton } from "./projection-pill-components/AscDesIconButton";

import {
  useProjectionSubjects,
  useProjectionSubjectProperties,
} from "../../GabbyQueryProtocol/Projections";

import { EditableLabel } from "./projection-pill-components/EditableLabel";

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

type Props = {
  projectionId: string;
};
export const ProjectionInteractiveItemPill = ({ projectionId }: Props) => {
  const { removeProjectionItem } = useProjectionSubjects();

  const {
    projectedSubject: initialProjectionItem,
    updateProjectionSubject: updateProjectionItem,
  } = useProjectionSubjectProperties(projectionId);

  const handleSortOrderChange = () => {
    updateProjectionItem({
      ...initialProjectionItem,
      sortOrder: nextSortOrder(initialProjectionItem.sortOrder),
    });
  };

  const handelUpdateLabel = (newText: string) => {
    updateProjectionItem({
      ...initialProjectionItem,
      label: newText,
    });
  };

  return (
    <Chip
      icon={
        <AscDesIconButton
          onSortOrderClick={handleSortOrderChange}
          sortOrder={initialProjectionItem.sortOrder}
        />
      }
      label={
        <EditableLabel labelText={initialProjectionItem.label} onChange={handelUpdateLabel} />
      }
      onDelete={() => removeProjectionItem(projectionId)}
      deleteIcon={<IconButtonRemove onClick={() => removeProjectionItem(projectionId)} />}
      variant="outlined"
      color="primary"
      // TODO - *tmc* theme color here
      sx={{ backgroundColor: "white" }}
    />
  );
};
