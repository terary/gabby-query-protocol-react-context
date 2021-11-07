import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
export const customStyles = {
  longText: "rgba(0, 0, 0, 0.7)",
  sectionBorder: "rgba(0, 0, 0, 0.3)",
  backgroundLightGrey: "theme.palette.grey[100]", // this doesn't work so well dynamically
  affirmativeGreen: "rgba(46, 125, 50, .8)",
};

export const customStylesWithTheme = (theme: Theme) => {
  return {
    ...customStyles,
    ...{
      backgroundLightGrey: theme.palette.grey[100],
    },
  };
  // backgroundLightGrey: useTheme().palette.grey[100], // "theme.palette.grey[100]",
};
