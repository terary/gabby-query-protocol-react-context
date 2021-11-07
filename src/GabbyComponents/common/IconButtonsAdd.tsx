import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOut from "@mui/icons-material/AddCircleOutline";

const noop = () => {};
type Props = {
  onClick?: () => void;
  dense?: boolean;
};
export const IconButtonsAdd = ({ dense = false, onClick = noop }: Props) => {
  return (
    <IconButton
      size="small"
      sx={dense ? { mx: "0px", p: "0px" } : {}}
      color="success"
      onClick={onClick}
    >
      <AddCircleOut fontSize="small" />
    </IconButton>
  );
};
