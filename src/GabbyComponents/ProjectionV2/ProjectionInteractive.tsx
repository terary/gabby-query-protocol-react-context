import { useProjectionSubjects } from "../../GabbyQueryProtocol/Projections";
import { ProjectionInteractiveItemPill } from "./ProjectionInteractiveItemPill";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { customStylesWithTheme } from "../../Application/custom-styles";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getListStyle = (isDraggingOver: boolean, theme: Theme) => {
  const customStyles = customStylesWithTheme(theme);

  return {
    //   background: isDraggingOver ? "lightblue" : `${customStyles.backgroundLightGrey}`,
    background: isDraggingOver ? "lightblue" : `${customStyles.backgroundLightGrey}`,

    //  background: isDraggingOver ? "lightblue" : theme.palette.grey[100],
    borderRadius: "5px",
    display: "flex",
    padding: grid,
    overflow: "auto",
  };
};

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggingStyle | NotDraggingStyle
): React.CSSProperties | undefined => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `${grid}px ${grid}px 0 0`,
  // margin: `${grid}px`,
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const ProjectionInteractive = () => {
  const theme = useTheme();
  const { updateSubjectColumnPosition, getColumnOrderedProjectionDictionary } =
    useProjectionSubjects();

  const onDragEndProjection = (result: DropResult) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    if (result.source.index === result.destination.index) {
      return; // no move
    }

    const reorderedKeyPosition = reorder(
      Object.keys(getColumnOrderedProjectionDictionary()),
      result.source.index,
      result.destination.index
    );

    reorderedKeyPosition.forEach((projectionKey, index) => {
      updateSubjectColumnPosition(projectionKey, index);
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEndProjection}>
      <Droppable droppableId="droppable2" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              ...getListStyle(snapshot.isDraggingOver, theme as Theme),
              ...{ flexWrap: "wrap" },
              // some reason react/compiler, "wrap" not correct type, when in getListStyle
            }}
            {...provided.droppableProps}
          >
            {Object.entries(getColumnOrderedProjectionDictionary()).map(
              ([projectionId, projection], index) => (
                <Draggable key={projectionId} draggableId={projectionId} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <ProjectionInteractiveItemPill projectionId={projectionId} />
                    </div>
                  )}
                </Draggable>
              )
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
