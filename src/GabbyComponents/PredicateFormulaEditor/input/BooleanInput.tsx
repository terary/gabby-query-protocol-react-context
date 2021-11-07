/* eslint-disable import/prefer-default-export */
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import { ChangeEvent } from "react";

interface IProps {
  id: string;
  label: string;
  name: string;
  onChange: (value: boolean) => void; // we'll allow empty strings
  value: boolean;
}
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const BooleanInput = ({ id, label, name, onChange, value }: IProps) => {
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onChange(checked);
  };
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>False</Typography>
        <AntSwitch
          onChange={handleCheckChange}
          checked={value}
          // defaultChecked
          inputProps={{ "aria-label": name, name, id }}
        />
        <Typography>True</Typography>
      </Stack>
    </FormControl>
  );
};
