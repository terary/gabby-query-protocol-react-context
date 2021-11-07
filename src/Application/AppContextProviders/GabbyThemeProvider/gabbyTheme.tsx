import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { zhCN } from "@mui/material/locale";
import { enUS } from "@mui/material/locale";
import { useApplicationUtilities } from "../hooks";

export const gabbyTheme = (localization = enUS) => {
  return createTheme(
    {
      palette: {
        // primary: {
        //   main: purple[500],
        // },
        // secondary: {
        //   main: green[500],
        // },
      },
    },
    localization
  );
};
