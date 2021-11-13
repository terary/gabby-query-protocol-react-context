import Chip from "@mui/material/Chip";
import { IconButtonRemove } from "../common/IconButtonRemove";
import { AscDesIconButton } from "./projection-pill-components/AscDesIconButton";

import { ProjectionContextHooks } from "../../GabbyQueryProtocol";

import { EditableLabel } from "./projection-pill-components/EditableLabel";

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

type Props = {
  projectionId: string;
};
export const ProjectionInteractiveItemPill = ({ projectionId }: Props) => {
  // TODO - *tmc* make sure the getProjectedItem(projectionId) doesn't wreak havoc with re-render
  const { removeProjectionItem } = useProjectionSubjects();
  const { getProjectedItem, updateProjectedItem } = useProjectionSubjects();
  // const {
  //   // projectedSubject: initialProjectionItem,
  //   updateProjectionSubject: updateProjectionItem,
  // } = useProjectionSubjectProperties(projectionId);

  const handleSortOrderChange = () => {
    updateProjectedItem(projectionId, {
      ...getProjectedItem(projectionId),
      sortOrder: nextSortOrder(getProjectedItem(projectionId).sortOrder),
    });
  };

  const handelUpdateLabel = (newText: string) => {
    updateProjectedItem(projectionId, {
      ...getProjectedItem(projectionId),
      label: newText,
    });
  };

  return (
    <Chip
      icon={
        <AscDesIconButton
          onSortOrderClick={handleSortOrderChange}
          sortOrder={getProjectedItem(projectionId).sortOrder}
        />
      }
      label={
        <EditableLabel
          labelText={getProjectedItem(projectionId).label}
          onChange={handelUpdateLabel}
        />
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
