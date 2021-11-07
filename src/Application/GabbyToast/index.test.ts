import * as exportNonTypes from ".";
describe("GabbyToast.index - export non-type", () => {
  it('Should export only GabbyToast, GabbyToastContainer non type things"', () => {
    expect(Object.keys(exportNonTypes).length).toBe(2);
    expect("GabbyToast" in exportNonTypes).toBeTruthy();
    expect("GabbyToastContainer" in exportNonTypes).toBeTruthy();
    expect(typeof exportNonTypes).toBe("object");
  });
  it("should not have undefined exports", () => {
    Object.keys(exportNonTypes).forEach((exportKey) =>
      //@ts-ignore
      expect(Boolean(exportNonTypes[exportKey])).toBe(true)
    );
  });
});
