/* eslint-disable import/prefer-default-export */

import { useProjectionSubjectProperties } from "../import-from-lib";
import styles from "../componentized.module.css";

// TProjectionProperties
interface Props {
  projectionKey: string;
}

export const ProjectedSubjectSimple = ({ projectionKey }: Props): JSX.Element => {
  const { projectedSubject: subject } = useProjectionSubjectProperties(projectionKey);

  return <div className={styles.projectionItemSimple}>{subject.label}</div>;
};
