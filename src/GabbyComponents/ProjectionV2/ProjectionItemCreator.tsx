import { TProjectionItemProperties } from "gabby-query-protocol-projection/dist/ProjectionEditor";
import { ProjectionItemEditor } from "./ProjectionItemEditor";
import { ProjectionContextHooks } from "../../GabbyQueryProtocol";

import { useRef, useState } from "react";
import { PopoverContainer } from "../common/PopoverContainer";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTheme } from "@mui/system";
import { customStyles } from "../../Application/custom-styles";
import { Theme } from "@mui/material/styles";
import { useProjectionUtilities } from "../../GabbyQueryProtocol/Projections/hooks/useProjectionUtilities";
const { useProjectionSubjects } = ProjectionContextHooks;

export const ProjectionItemCreator = () => {
  const theme = useTheme;
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  const [newProjectionItem, setNewProjectionItem] = useState({});
  const { addProjectionItem } = useProjectionSubjects();
  const { makeDefaultProjectionItem } = useProjectionUtilities();

  const projectionItem = makeDefaultProjectionItem();
  const containerRef = useRef(null);
  const handleFinish = (updatedProjectionItem: TProjectionItemProperties) => {
    setNewProjectionItem(updatedProjectionItem);
    setIsOpenForEdit(false);
    addProjectionItem(updatedProjectionItem);
  };

  const setIsOpenForEditFalse = () => {
    setIsOpenForEdit(false);
  };

  const setIsOpenForEditTrue = () => {
    setIsOpenForEdit(true);
  };

  const Editor = () => {
    return (
      <ProjectionItemEditor
        initialProjectionItem={projectionItem}
        onFinish={handleFinish}
        onCancel={() => {
          setIsOpenForEdit(false);
        }}
        buttonStyle="textCancelFinishButtons"
      />
    );
  };

  return (
    <div ref={containerRef} style={{ display: "inline", float: "left" }}>
      <PopoverContainer
        children={<Editor />}
        isOpen={isOpenForEdit}
        parentEl={containerRef.current}
        onClickAway={setIsOpenForEditFalse}
      />
      <IconButton
        onClick={setIsOpenForEditTrue}
        size="large"
        // color={customStyles.affirmativeGreen}
        sx={{
          color: `${customStyles.affirmativeGreen}`,
          // mt: "12px", // hate to do it
          // height: "20px",
        }}

        // aria-label="upload picture"
        // component="span"
      >
        <AddCircleOutlineOutlinedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};
