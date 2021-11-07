import React from "react";
import { TSupportedLocales } from "..";
import ApplicationUtilitiesProvider, {
  useTestUtilities,
} from "./ApplicationUtilitiesProvider";
import { ErrorContainer } from "./ErrorContainer";
import DateLocalizationProvider from "./DateLocalizationProvider";
import GabbyThemeProvider from "./GabbyThemeProvider";

interface IAppProviderParameters {
  children?: React.ReactNode;
  initialLocaleCode?: TSupportedLocales;
}

export const AppContextProviders = ({
  initialLocaleCode,
  children,
}: IAppProviderParameters) => {
  return (
    <ErrorContainer>
      {" "}
      {/* Error container may have issue with hooks, requires testing */}
      <ApplicationUtilitiesProvider initialLocaleCode={initialLocaleCode}>
        <GabbyThemeProvider>
          <DateLocalizationProvider>{children}</DateLocalizationProvider>
        </GabbyThemeProvider>
      </ApplicationUtilitiesProvider>
    </ErrorContainer>
  );
};

export { useTestUtilities };
