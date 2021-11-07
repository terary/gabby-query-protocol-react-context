import { ArrowDropUp } from "@mui/icons-material";
import { ArrowDropDown } from "@mui/icons-material";
import { HorizontalRule } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

type Props = {
  sortOrder: number;
  onSortOrderClick: () => void;
};
export const AscDesIconButton = ({ sortOrder, onSortOrderClick }: Props) => {
  return (
    <>
      <Tooltip title="Sort Asc/Desc" placement="bottom">
        <IconButton size="small" onClick={onSortOrderClick}>
          {sortOrder < 0 && <ArrowDropDown />}
          {sortOrder === 0 && <HorizontalRule />}
          {sortOrder > 0 && <ArrowDropUp />}
        </IconButton>
      </Tooltip>
    </>
  );
};
