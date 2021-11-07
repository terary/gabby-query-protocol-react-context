import * as React from "react";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import { sizeHeight } from "@mui/system";

const noop = () => {};
type Props = {
  onClick?: () => void;
  dense?: boolean;
};
export const IconButtonRemove = ({ dense = false, onClick = noop }: Props) => {
  return (
    <IconButton
      size="small"
      sx={dense ? { mx: "0px", p: "0px" } : {}}
      color="error"
      onClick={onClick}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
