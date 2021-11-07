import React, { useState } from "react";
import renderer, { act } from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { toMatchDiffSnapshot } from "snapshot-diff";
import { AppContextProviders } from "../AppContextProviders";
import { PageContentWrapper } from "./PageContentWrapper";
expect.extend({ toMatchDiffSnapshot });

describe("PageContentWrapper", () => {
  describe("Snapshots should be unchanged", () => {
    it("Should render title bar adjusted for left horizontal menu, opened", () => {
      const tree = renderer
        .create(
          <AppContextProviders>
            <BrowserRouter>
              <PageContentWrapper />
            </BrowserRouter>
          </AppContextProviders>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  }); // snapshot
  describe("isOpen state", () => {
    it("Should change open/closed state by setting 'isOpen'", () => {
      const AppBarStateWrapper = () => {
        return (
          <AppContextProviders>
            <BrowserRouter>
              <PageContentWrapper />
            </BrowserRouter>
          </AppContextProviders>
        );
      };
      const component = renderer.create(<AppBarStateWrapper />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      act(() => {
        component.root.findByProps({ "aria-label": "close drawer" }).props.onClick();
        const treeUpdated = component.toJSON();
        expect(tree).toMatchDiffSnapshot(treeUpdated);
      }); //
      act(() => {
        component.root.findByProps({ "aria-label": "open drawer" }).props.onClick();
        const treeUpdated = component.toJSON();
        expect(tree).toMatchDiffSnapshot(treeUpdated);
      }); //
    });
  });
});
