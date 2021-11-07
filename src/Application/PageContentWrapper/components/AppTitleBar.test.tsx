import React, { useState } from "react";
import renderer, { act } from "react-test-renderer";
import { AppTitleBar } from "./AppTitleBar";
import { toMatchDiffSnapshot } from "snapshot-diff";
import { AppContextProviders } from "../../AppContextProviders";
expect.extend({ toMatchDiffSnapshot });

interface IAppBarProps {
  isOpen: boolean;
  titleText: string;
  toggleDrawer: () => void;
}
const AppBarContextWrapper = ({ isOpen, titleText, toggleDrawer }: IAppBarProps) => {
  return (
    <AppContextProviders>
      <AppTitleBar titleText={titleText} isOpen={isOpen} toggleDrawer={() => {}} />
    </AppContextProviders>
  );
};

describe("AppTitleBar", () => {
  describe("Snapshots open/close", () => {
    it("Should render title bar adjusted for left horizontal menu, opened", () => {
      const titleText = "The Awesome Test App";

      const tree = renderer
        .create(
          <AppBarContextWrapper titleText={titleText} isOpen={true} toggleDrawer={() => {}} />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("Should render title bar adjusted for left horizontal menu, closed", () => {
      const titleText = "The Awesome Test App";

      const tree = renderer
        .create(
          <AppBarContextWrapper titleText={titleText} isOpen={false} toggleDrawer={() => {}} />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe("isOpen state managed by parent", () => {
    it("Should change open/closed state by setting 'isOpen'", () => {
      const AppBarStateWrapper = () => {
        const titleText = "The Awesome Test App";
        const [isOpen, setIsOpen] = useState(false);
        const toggleDrawer = () => {
          setIsOpen(!isOpen);
        };
        return (
          <AppBarContextWrapper
            isOpen={isOpen}
            titleText={titleText}
            toggleDrawer={toggleDrawer}
          />
        );
      };

      const component = renderer.create(<AppBarStateWrapper />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      act(() => {
        component.root.findByProps({ "aria-label": "open drawer" }).props.onClick();
        const treeUpdated = component.toJSON();
        expect(tree).toMatchDiffSnapshot(treeUpdated);
      });
    });
  });
});
