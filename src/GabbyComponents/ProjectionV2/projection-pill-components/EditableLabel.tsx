import Typography from "@mui/material/Typography";
import { ChangeEvent, useState } from "react";
import { Input } from "@mui/material";

type Props = {
  labelText: string;
  onChange: (newLabelText: string) => void;
};

export const EditableLabel = ({ labelText, onChange }: Props) => {
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const setOpenForEditTrue = () => {
    setIsOpenForEdit(true);
  };

  const setOpenForEditFalse = () => {
    setIsOpenForEdit(false);
  };

  return (
    <>
      {!isOpenForEdit && (
        <Typography>
          <span onClick={setOpenForEditTrue}>{labelText}</span>
        </Typography>
      )}

      {isOpenForEdit && (
        <Input
          sx={{ maxWidth: "25em" }}
          onChange={handleTextChange}
          onBlur={setOpenForEditFalse}
          id="projection-label-editor"
          name="projection-label-editor"
          value={labelText}
        />
      )}
    </>
  );
};
