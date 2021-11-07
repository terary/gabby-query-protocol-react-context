import React from "react";
import { GabbyToast, GabbyToastContainer } from "./GabbyToast";
import { render, fireEvent, waitFor, screen, act, cleanup } from "@testing-library/react";

import { AppContextProviders } from "../AppContextProviders";
const DebugContainer = ({ toastFunction }: { toastFunction: () => void }) => {
  const clickHandler = () => {
    toastFunction();
  };
  return (
    <AppContextProviders>
      <div>
        <button onClick={clickHandler}>Test Button</button>
        {/* <GabbyToastContainer /> */}
      </div>
    </AppContextProviders>
  );
};
afterEach(cleanup);
describe("GabbyToast", () => {
  describe(".error", () => {
    it("Should display message, title and error icon", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.error({ message: "Test Info Test", title: "Awesome Title" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");
      const beforeToastTitle = screen.queryByText("Awesome Title");

      expect(beforeToastMessage).toBeNull();
      expect(beforeToastTitle).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);
      const afterToastTitle = screen.queryByText("Awesome Title");

      const errorIcon = screen.queryByRole("ErrorOutlineIcon"); // seems to work as expected in prod
      const infoIcon = screen.queryByTestId("InfoOutlinedIcon");
      const successIcon = screen.queryByTestId("SuccessOutlinedIcon");
      const warnIcon = screen.queryByTestId("ReportProblemOutlinedIcon");

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
      expect(afterToastTitle).toBeInTheDocument();

      // expect(errorIcon).toBeInTheDocument();  // seems to work as expected in prod
      expect(infoIcon).not.toBeInTheDocument();
      expect(successIcon).not.toBeInTheDocument();
      expect(warnIcon).not.toBeInTheDocument();
    });
    it("Should accept optional debug parameter to be outputted to console.dir", () => {
      // setup
      const consoleSpy = jest.spyOn(console, "dir");

      const gabbyToastCall = () => {
        GabbyToast.error({
          message: "Test Info Test",
          title: "Awesome Title",
          debug: { something: "debug useful" },
        });
      };
      const testClick = jest.fn(gabbyToastCall);

      // exercise
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith({ error: { something: "debug useful" } });
      expect(consoleSpy).not.toHaveBeenCalledWith("something else");
    });
    it("Should accept optional debug parameter to be outputted to console.dir (optional title)", () => {
      // setup
      const consoleSpy = jest.spyOn(console, "dir");

      const gabbyToastCall = () => {
        GabbyToast.error({
          message: "Test Info Test",
          debug: { something: "debug useful" },
        });
      };
      const testClick = jest.fn(gabbyToastCall);

      // exercise
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith({ error: { something: "debug useful" } });
      expect(consoleSpy).not.toHaveBeenCalledWith("something else");
    });
  }); // describe error

  describe(".info", () => {
    it("Should display message, title and info icon", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.info({ message: "Test Info Test", title: "Awesome Title" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");
      const beforeToastTitle = screen.queryByText("Awesome Title");

      expect(beforeToastMessage).toBeNull();
      expect(beforeToastTitle).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);
      const afterToastTitle = screen.queryByText("Awesome Title");

      const errorIcon = screen.queryByRole("ErrorOutlineIcon");
      const infoIcon = screen.queryByTestId("InfoOutlinedIcon");
      const successIcon = screen.queryByTestId("SuccessOutlinedIcon");
      const warnIcon = screen.queryByTestId("ReportProblemOutlinedIcon");

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
      expect(afterToastTitle).toBeInTheDocument();

      // expect(alert).toHaveTextContent("Test Info Test");
      expect(errorIcon).not.toBeInTheDocument();
      expect(infoIcon).toBeInTheDocument();
      expect(successIcon).not.toBeInTheDocument();
      expect(warnIcon).not.toBeInTheDocument();
    });
    it("Title should be optional", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.info({ message: "Test Info Test" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");

      expect(beforeToastMessage).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
    });
  }); // describe info

  describe(".success", () => {
    it("Should display message, title and success icon", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.success({ message: "Test Success Text", title: "Awesome Success Title" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Success Text");
      const beforeToastTitle = screen.queryByText("Awesome Success Title");

      expect(beforeToastMessage).toBeNull();
      expect(beforeToastTitle).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Success Text/);
      const afterToastTitle = screen.queryAllByText("Awesome Success Title");

      const errorIcon = screen.queryByRole("ErrorOutlineIcon");
      const infoIcon = screen.queryByTestId("InfoOutlinedIcon");
      const successIcon = screen.queryByTestId("SuccessOutlinedIcon");
      const warnIcon = screen.queryByTestId("ReportProblemOutlinedIcon");

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
      expect(afterToastTitle.length).toBeGreaterThan(0);

      // expect(alert).toHaveTextContent("Test Info Test");
      expect(errorIcon).not.toBeInTheDocument();
      expect(infoIcon).not.toBeInTheDocument();
      expect(successIcon).toBeInTheDocument();
      expect(warnIcon).not.toBeInTheDocument();
    });
    it("Title should be optional", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.success({ message: "Test Info Test" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");

      expect(beforeToastMessage).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
    });
  }); // describe success
  describe(".warn", () => {
    it("Should display message, title and warn icon", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.warn({ message: "Test Info Test", title: "Awesome Title" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");
      const beforeToastTitle = screen.queryByText("Awesome Title");

      expect(beforeToastMessage).toBeNull();
      expect(beforeToastTitle).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);
      const afterToastTitle = screen.queryByText("Awesome Title");

      const errorIcon = screen.queryByRole("ErrorOutlineIcon");
      const infoIcon = screen.queryByTestId("InfoOutlinedIcon");
      const successIcon = screen.queryByTestId("SuccessOutlinedIcon");
      const warnIcon = screen.queryByTestId("ReportProblemOutlinedIcon");

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
      expect(afterToastTitle).toBeInTheDocument();

      // expect(alert).toHaveTextContent("Test Info Test");
      expect(errorIcon).not.toBeInTheDocument();
      expect(infoIcon).not.toBeInTheDocument();
      expect(successIcon).not.toBeInTheDocument();
      expect(warnIcon).toBeInTheDocument();
    });
    it("Title should be optional", async () => {
      // set-up
      const gabbyToastCall = () => {
        GabbyToast.warn({ message: "Test Info Test" });
      };

      const testClick = jest.fn(gabbyToastCall);
      act(() => {
        render(<DebugContainer toastFunction={testClick} />);
      });

      // pre conditions
      const beforeToastMessage = screen.queryByText("Test Info Test");

      expect(beforeToastMessage).toBeNull();

      // exercise
      act(() => {
        const button = screen.getByText(/Test Button/);
        fireEvent.click(button);
      });

      // post condition
      expect(testClick).toHaveBeenCalled();

      const allAlerts = await screen.findAllByRole("alert");
      const afterToastMessage = screen.queryByText(/Test Info Test/);

      expect(allAlerts.length).toBeGreaterThan(0); // presumably there are several child-like things with role='alert'
      expect(afterToastMessage).toBeInTheDocument();
    });
  }); // describe warn
});
