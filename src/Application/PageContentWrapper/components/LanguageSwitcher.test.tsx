import { LanguageSwitcher } from "./LanguageSwitcher";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, within, cleanup } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";
import { AppContextProviders } from "../../AppContextProviders";
import { useApplicationUtilities } from "../../index";
expect.extend({ toMatchDiffSnapshot });

const LanguageSwitcherWrapper = () => {
  const { getCurrentLocaleCode } = useApplicationUtilities();
  return (
    <div>
      <LanguageSwitcher />
      current language:
      <span data-testid="the-current-language-code">{getCurrentLocaleCode()}</span>
    </div>
  );
};

const LanguageSwitcherAppWrapper = () => {
  return (
    <AppContextProviders>
      <LanguageSwitcherWrapper />
    </AppContextProviders>
  );
};

describe("LanguageSwitcher", () => {
  afterEach(cleanup);
  it("Should render", () => {
    const tree = renderer.create(<LanguageSwitcherAppWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Should change language", () => {
    const { getByTestId, getByRole } = render(<LanguageSwitcherAppWrapper />);

    expect(getByTestId("the-current-language-code")).toBeInTheDocument();
    expect(getByTestId("the-current-language-code").innerHTML).toBe("es_mx");

    fireEvent.mouseDown(getByRole("button"));
    const listbox = within(getByRole("listbox"));
    fireEvent.click(listbox.getByText(/Deutsch/i));

    fireEvent.click(getByRole("button"));

    expect(getByTestId("the-current-language-code").innerHTML).toBe("de_de");
    cleanup(); // this doesn't re-set app state
  });
  it("Should change language direction accordingly", () => {
    const { getByTestId, getByRole, container } = render(<LanguageSwitcherAppWrapper />);

    expect(getByTestId("the-current-language-code")).toBeInTheDocument();
    // expect(getByTestId("the-current-language-code").innerHTML).toBe("ex_mx");

    fireEvent.mouseDown(getByRole("button"));
    const listbox = within(getByRole("listbox"));
    fireEvent.click(listbox.getByText(/المغرب/i));
    fireEvent.click(getByRole("button"));

    expect(getByTestId("the-current-language-code").innerHTML).toBe("ar_ma");
    const htmlDoc = container.querySelector("html");
    expect(htmlDoc).toBeNull();
  });
});
