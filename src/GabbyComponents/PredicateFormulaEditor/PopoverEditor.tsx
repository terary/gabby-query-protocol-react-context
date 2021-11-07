/* eslint-disable import/prefer-default-export */
/*
To use:
   const parentRef = React.useRef<HTMLElement>(null);
   const [isOpen, setIsOpen] = React.useState()
   ...
   <div ref={parentRef}>
      any stuff goes here
      <button onClick={()=>{setIsOpen(!isOpen)}}>
        toggle open/close 
      </button>        
   </div>
    <PopOverEditor
      id="simple-popover"
      initialPredicate={thisPredicateExpression}
      isOpen={isPopOverOpen}
      onFinish={handleFinishPredicateEditor}
      onCancel={() => {
        setIsPopOverOpen(false);
      }}
      parentEl={stackRef.current}
    />
*/

import React from "react";
import Popover from "@mui/material/Popover";

import type {
  TPredicateProperties,
  TPredicatePropertiesArrayValue,
} from "gabby-query-protocol-lib";
import Box from "@mui/material/Box";
import { PredicateEditor } from "./PredicateEditor";
import { PopoverContainer } from "../common/PopoverContainer";

interface Props {
  id: string;
  isOpen: boolean;
  initialPredicate: TPredicateProperties | TPredicatePropertiesArrayValue;
  layout?: "1row" | "2row" | "3row";
  minWidth?: number | string;
  onFinish: (
    predicateProperties: TPredicateProperties | TPredicatePropertiesArrayValue
  ) => void;
  onCancel: () => void;
  parentEl: HTMLElement | null;
  width?: number | string;
}

export function PopoverEditor({
  id,
  initialPredicate,
  isOpen,
  layout,
  minWidth,
  onCancel,
  onFinish,
  parentEl,
  width,
}: Props): JSX.Element {
  return (
    // <Popover
    //   // TODO *tmc* this should use theme at least for color, black is the wrong color.
    //   PaperProps={{ sx: { border: "1px black solid" } }}
    //   sx={{ width }}
    //   id={isOpen ? id : undefined}
    //   open={isOpen}
    //   anchorEl={parentEl}
    //   onClose={onCancel}
    //   transformOrigin={{ horizontal: -10, vertical: -35 }}
    //   transitionDuration={500}
    // >
    //   <Box sx={{ m: "10px", minWidth }}>
    <PopoverContainer onClickAway={onCancel} isOpen={isOpen} parentEl={parentEl}>
      <PredicateEditor
        initialPredicate={initialPredicate}
        onFinish={onFinish}
        onCancel={onCancel}
        layout={layout}
      />
    </PopoverContainer>

    //   </Box>
    // </Popover>
  );
}

PopoverEditor.defaultProps = {
  width: "50%",
  minWidth: "250px",
  layout: "3row",
};
