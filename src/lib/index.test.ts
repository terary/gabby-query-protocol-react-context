import * as libExport from ".";

const expectedExports = [
  "CONSTS",
  "EXAMPLE_JSON_BLUE_SKIES",
  "GabbyAssetFactory",
  "GabbyQueryProtocolContext",
  "GabbyQueryProtocolContextProvider",
  "PredicateFormulaEditor",
  "PredicateTree",
  "PredicateTreeError",
  "PredicateTreeVisitors",
  "useJunctionProperties",
  "usePredicateProperties",
  "useProjectionSubjectProperties",
  "useProjectionSubjects",
  "Validators",
];

describe("gabby-query-protocol-react-context exports", () => {
  it(`Should ${expectedExports.length} items`, () => {
    expect(Object.keys(libExport).length).toBe(expectedExports.length);
  });
  expectedExports.forEach((exportedItem) => {
    it(`Should export: ${exportedItem}`, () => {
      expect(exportedItem in libExport).toStrictEqual(true);
    });
  });

  // export { GabbyAssetFactory, GabbyQueryProtocolContext, CONSTS, EXAMPLE_JSON_BLUE_SKIES };
});