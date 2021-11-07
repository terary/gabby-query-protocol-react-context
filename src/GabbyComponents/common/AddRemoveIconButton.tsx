import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { IconButtonsAdd } from "./IconButtonsAdd";
import { IconButtonRemove } from "./IconButtonRemove";
import { IconButtonEdit } from "./IconButtonEdit";

const noop = () => {};
type Props = {
  addClick?: () => void;
  removeClick?: () => void;
  dense?: boolean;
};
export const AddRemoveIconButtons = ({
  addClick = noop,
  dense = false,
  removeClick = noop,
}: Props) => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButtonsAdd dense onClick={addClick} />
      <IconButtonRemove dense onClick={removeClick} />
      <IconButtonEdit dense onClick={removeClick} />
    </Stack>
  );
};
