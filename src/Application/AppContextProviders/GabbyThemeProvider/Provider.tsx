import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { gabbyTheme } from "./gabbyTheme";
import { useApplicationUtilities } from "../hooks";
interface IAppProviderParameters {
  children?: React.ReactNode;
}

export const GabbyThemeProvider = ({ children }: IAppProviderParameters) => {
  const { getLocale } = useApplicationUtilities();
  const materialLocale = getLocale();

  return (
    <ThemeProvider theme={gabbyTheme(materialLocale.materialThemeLocal)}>
      {children}
    </ThemeProvider>
  );
};
