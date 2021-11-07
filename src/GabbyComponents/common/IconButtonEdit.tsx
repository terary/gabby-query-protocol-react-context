import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Create";

const noop = () => {};
type Props = {
  onClick?: () => void;
  dense?: boolean;
};
export const IconButtonEdit = ({ dense = false, onClick = noop }: Props) => {
  return (
    <IconButton
      size="small"
      sx={dense ? { mx: "0px", p: "0px" } : {}}
      color="success"
      onClick={onClick}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
};
