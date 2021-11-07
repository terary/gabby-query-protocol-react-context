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
    <PopoverContainer
      children={<SomeComponent />},
      isOpen={isPopOverOpen}
      minWidth="500px",
      onClickAway={()=>{setIsOpen(false)}},
      parentEl={stackRef.current}
      width="500px",
    />
*/

import React, { ReactNode } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  minWidth?: number | string;
  onClickAway: () => void;
  parentEl: HTMLElement | null;
  width?: number | string;
}

export function PopoverContainer({
  children,
  isOpen,
  minWidth,
  onClickAway,
  parentEl,
  width,
}: Props): JSX.Element {
  return (
    <Popover
      // TODO *tmc* this should use theme at least for color, black is the wrong color.
      PaperProps={{ sx: { border: "1px black solid" } }}
      sx={{ width }}
      open={isOpen}
      anchorEl={parentEl}
      onClose={onClickAway}
      transformOrigin={{ horizontal: -10, vertical: -35 }}
      transitionDuration={500}
    >
      <Box sx={{ m: "10px", minWidth }}>{children}</Box>
    </Popover>
  );
}

PopoverContainer.defaultProps = {
  width: "50%",
  minWidth: "250px",
  layout: "3row",
};
