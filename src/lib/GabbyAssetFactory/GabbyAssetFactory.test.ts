/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { TPredicateSubjectDictionaryJson } from "gabby-query-protocol-lib";
import { CONSTS } from "gabby-query-protocol-lib";

import cloneDeep from "lodash.clonedeep";
import { GabbyAssetFactory } from "./index";
import type { TGabbyAssetsJson } from "./index";
import subjectDictionaryBlueSkies from "../test-resources/test-subject-document.json";

const ALL_OPERATORS = CONSTS.PREDICATE_OPERATORS.concat(CONSTS.JUNCTION_OPERATORS);

// export type TGabbyAssets = {
//   predicateFormulaEditor: PredicateFormulaEditor;
//   projectionEditor: IProjectionEditor;
//   operatorLabels: TPredicateOperatorLabels;
// };

// export type TGabbyAssetsJson = {
//   subjectDictionaryJson: TPredicateSubjectDictionaryJson;
//   predicateTreeJson?: TSerializedPredicateTree;
//   projectionJson?: TProjectionPropertiesJson[];
//   projectableSubjectsJson?: TProjectableSubjectsDictionaryJson;
//   operatorLabelsJson?: TPredicateOperatorLabels;
//   newRootId?: string;
// };

describe("GabbyAssetFactory", () => {
  describe("fromJson", () => {
    describe("subjectDictionaryJson, the ony required json", () => {
      it("Should create necessary resources: operatorLabels, predicateFormulaEditor, projectionEditor", () => {
        const expectedSubjectIds = [
          "firstname",
          "lastname",
          "annualRevenue",
          "numberOfEmployees",
          "region",
          "favoriteFruit",
          "favoriteNumber",
          "startDate",
        ];
        const assetsJson: TGabbyAssetsJson = {
          subjectDictionaryJson:
            subjectDictionaryBlueSkies as TPredicateSubjectDictionaryJson,
        };

        // const assets = GabbyAssetFactory.fromJson(assetsJson);
        const { predicateFormulaEditor, projectionEditor, operatorLabels } =
          GabbyAssetFactory.fromJson(assetsJson);

        expect(predicateFormulaEditor.subjectsGetAllIds()).toStrictEqual(
          expectedSubjectIds
        );
        const projectedSubjects = Object.entries(projectionEditor.toJson()).map(
          ([index, projectionProps]) => {
            return projectionProps.subjectId;
          }
        );
        const j = projectionEditor.toJson();
        expect(projectedSubjects).toStrictEqual(expectedSubjectIds);

        expect(Object.keys(operatorLabels).sort()).toStrictEqual(ALL_OPERATORS.sort());
      });
      it("Should throw error if not provided", () => {
        const assetsJson: TGabbyAssetsJson = {
          // @ts-ignore
          subjectDictionaryJson: undefined,
          // subjectDictionaryBlueSkies as TPredicateSubjectDictionaryJson,
        };

        const willThrow = () => {
          GabbyAssetFactory.fromJson(assetsJson);
        };

        expect(willThrow).toThrow(TypeError);
      });
      it("Should throw error if not provided", () => {
        const assetsJson: TGabbyAssetsJson = {
          // @ts-ignore
          subjectDictionaryJson: {},
          // subjectDictionaryBlueSkies as TPredicateSubjectDictionaryJson,
        };

        const willThrow = () => {
          GabbyAssetFactory.fromJson(assetsJson);
        };

        try {
          willThrow();
        } catch (e) {
          expect(e.debugMessages.length).toBeGreaterThan(0);
          expect(e.constructor.name).toBe("Error");
        }
      });
      it("Should throw error if not provided", () => {
        const corruptedSubjects = cloneDeep(subjectDictionaryBlueSkies);

        // @ts-ignore
        delete corruptedSubjects.region.validOperators.$anyOf;

        const assetsJson: TGabbyAssetsJson = {
          // @ts-ignore
          subjectDictionaryJson: corruptedSubjects,
          // subjectDictionaryBlueSkies as TPredicateSubjectDictionaryJson,
        };

        const willThrow = () => {
          GabbyAssetFactory.fromJson(assetsJson);
        };

        try {
          willThrow();
        } catch (e) {
          expect(e.debugMessages.length).toBeGreaterThan(0);
          expect(e.constructor.name).toBe("Error");
        }
      });
    });
  });
});
