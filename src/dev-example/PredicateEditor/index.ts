/* eslint-disable import/prefer-default-export */
import { PredicateEditor } from "./PredicateEditor";

import { subjectsDocument } from "./subject-document";

export { PredicateEditor };

const str = JSON.stringify(subjectsDocument);
const json = JSON.parse(str);
