import React from "react";
import renderer, { act } from "react-test-renderer";
import { AppContextProviders } from "../../AppContextProviders";
import { AppSideDrawer } from "./AppSideDrawer";
import { BrowserRouter } from "react-router-dom";
import { toMatchDiffSnapshot } from "snapshot-diff";
expect.extend({ toMatchDiffSnapshot });

describe("AppSideDrawer", () => {
  describe("Snapshots open/close", () => {
    it("Should render left horizontal menu, opened", () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <AppContextProviders>
              <AppSideDrawer isOpen={true} toggleDrawer={() => {}} />
            </AppContextProviders>
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Should render left horizontal menu, closed", () => {
      const tree = renderer
        .create(
          <BrowserRouter>
            <AppContextProviders>
              <AppSideDrawer isOpen={false} toggleDrawer={() => {}} />
            </AppContextProviders>
          </BrowserRouter>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  }); // describe("Snapshots open/close"
  describe("isOpen state managed by parent", () => {
    it("Should change open/closed state by setting 'isOpen'", () => {
      const AppBarStateWrapper = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        const toggleDrawer = () => {
          setIsOpen(!isOpen);
        };
        return (
          <BrowserRouter>
            <AppContextProviders>
              <AppSideDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
            </AppContextProviders>
          </BrowserRouter>
        );
      };
      const component = renderer.create(<AppBarStateWrapper />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      act(() => {
        component.root.findByProps({ "aria-label": "close drawer" }).props.onClick();
        const treeUpdated = component.toJSON();
        expect(tree).toMatchDiffSnapshot(treeUpdated);
      });
    });
  });
});
