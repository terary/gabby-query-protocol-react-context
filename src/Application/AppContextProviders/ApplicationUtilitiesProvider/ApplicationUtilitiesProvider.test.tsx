import React, { useEffect, useState } from "react";
import { render, cleanup, fireEvent, waitFor, screen, act } from "@testing-library/react";

import ApplicationUtilitiesProvider, {
  ApplicationUtilitiesContext,
} from "./ApplicationUtilitiesProvider";
import { ApplicationUtilitiesType } from "./type";
import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";

const AppMockWithContext = () => {
  return (
    <ApplicationUtilitiesProvider>
      <AppMock />
    </ApplicationUtilitiesProvider>
  );
};

const AppMockWithChildrenAndContext = ({ children }: { children: React.ReactNode }) => {
  return <ApplicationUtilitiesProvider>{children}</ApplicationUtilitiesProvider>;
};

const AppMock = () => {
  const {
    changeLanguage,
    getAppStateItem,
    getAppStateItemOrAlternative,
    getLanguage,
    getLocale,
    setAppStateItem,
    t,
  } = React.useContext(ApplicationUtilitiesContext) as ApplicationUtilitiesType;
  const [initialLocale, setIntialLocale] = useState(getAppStateItem("locale"));

  useEffect(() => {
    // funny if switch order: setAppStateItem, changeLanguage it breaks the test
    // but it really should  (hinky stuff with state)
    changeLanguage("ar_ma");
    setAppStateItem("test-setAppStateItem", "This will be in component.");
  }, []);

  return (
    <div>
      <span>{getAppStateItem("test-setAppStateItem")}</span>
      <span>Initial Locale: {initialLocale}</span>
      <span>After Locale: {getLanguage()}</span>
      <span>{getAppStateItemOrAlternative("DOES_NOT_EXIST", "ALTERNATIVE_TEXT")}</span>
      <span>{t("FALL_THROUGH_DOES_NOT_EXIST")}</span>
      <span>{t("DOES_NOT_EXIST", "ALTERNATIVE_TRANSLATION")}</span>
      <span>{t("my-i18n-key")}</span>
      <span>{t("test_i18n")}</span>
      <span data-testid="get-locale-key-does-not-exits">
        {getLocale("DOES_NOT_EXIST").localeCode}
      </span>
      <h4>Mock App</h4>
    </div>
  );
};

describe("ApplicationUtilitiesProvider", () => {
  afterEach(cleanup);
  it("Should provide app state get/set functionality", () => {
    act(() => {
      render(<AppMockWithContext />);
    });

    expect(screen.getByText("This will be in component.")).toBeInTheDocument();
  });
  it.skip("Should change language", () => {
    act(() => {
      render(<AppMockWithContext />);
    });

    expect(screen.getByText("Initial Locale: es_mx")).toBeInTheDocument();
    expect(screen.getByText("After Locale: ar_ma")).toBeInTheDocument();
  });
  it("Should alternative text", () => {
    act(() => {
      render(<AppMockWithContext />);
    });

    expect(screen.getByText("ALTERNATIVE_TEXT")).toBeInTheDocument();
  });

  it("Get non-existing locale", () => {
    const AppMockGetLocale = () => {
      const { getLocale, setCurrentLocale } = React.useContext(
        ApplicationUtilitiesContext
      ) as ApplicationUtilitiesType;
      setCurrentLocale("THIS_SHOULD_NEVER_BE");

      useEffect(() => {
        setCurrentLocale("THIS_SHOULD_NEVER_BE");
      }, []);

      return (
        <div>
          <span data-testid="get-locale-key-does-not-exits">
            {getLocale("DOES_NOT_EXIST").localeCode}
          </span>
        </div>
      );
    };

    act(() => {
      render(
        <AppMockWithChildrenAndContext>
          <AppMockGetLocale />
        </AppMockWithChildrenAndContext>
      );
      expect(screen.getByTestId("get-locale-key-does-not-exits").innerHTML).toBe("en_us");
    });
  });
  it("Should alternative translation", () => {
    act(() => {
      render(<AppMockWithContext />);
    });
    expect(screen.getByText("ALTERNATIVE_TRANSLATION")).toBeInTheDocument();
  });
  it("Should alternative translation, key will fall-through", () => {
    act(() => {
      render(<AppMockWithContext />);
    });
    expect(screen.getByText("FALL_THROUGH_DOES_NOT_EXIST")).toBeInTheDocument();
  });
  it.skip("Should translate known key with alternative", () => {
    // this works - except previous test changes language
    // need to do independent render for each test
    act(() => {
      render(<AppMockWithContext />);
    });

    expect(screen.getByText("Some long text just fo fun")).toBeInTheDocument();
  });
  it.skip("Should translate known key, without alternative", () => {
    // this works - except previous test changes language
    // need to do independent render for each test
    act(() => {
      render(<AppMockWithContext />);
    });

    expect(screen.getByText("This was a test, this was only a test")).toBeInTheDocument();
  });

  it("Should be Awesome", () => {
    expect("Awesome").toBe("Awesome");
  });
});
