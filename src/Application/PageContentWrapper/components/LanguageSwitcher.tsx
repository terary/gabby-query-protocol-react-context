import * as React from "react";

import { SUPPORTED_LOCALE_DICTIONARY, useApplicationUtilities } from "../..";
import type { TSupportedLocales } from "../..";
import { useTheme, makeStyles } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const LanguageSwitcher = () => {
  const { setCurrentLocale, getCurrentLocaleCode, getLocale, t } = useApplicationUtilities();
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    const localeCode = event.target.value as TSupportedLocales;
    const localeSettings = getLocale(localeCode);
    setCurrentLocale(event.target.value as TSupportedLocales);

    const htmlPage = document.querySelector("html");
    if (htmlPage !== null) {
      htmlPage.setAttribute("dir", localeSettings.languageDir);
      htmlPage.setAttribute("lang", localeSettings.languageCode);
    }
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={getCurrentLocaleCode()}
          onChange={handleChange}
          label={t("Language")}
          sx={{ color: theme.palette.grey[100], borderBottom: "1px solid white" }}
        >
          {Object.entries(SUPPORTED_LOCALE_DICTIONARY).map(([localeKey, localeSetting]) => {
            {
              return (
                <MenuItem value={localeKey} key={localeKey}>
                  {localeSetting.countryNameLocal}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
      {/* <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
    </div>
  );
};
