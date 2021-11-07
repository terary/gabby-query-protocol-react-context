/* eslint-disable import/prefer-default-export */
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import { useTranslation } from "react-i18next";

interface Props {
  onFinish: () => void;
  onCancel: () => void;
}

export const ButtonsFinishCancelIcon = ({ onFinish, onCancel }: Props): JSX.Element => {
  const { t, i18n } = useTranslation();
  return (
    <Grid container spacing="3">
      <Grid item xs={6}>
        <IconButton
          aria-label={t("ButtonsFinishCancelLarge_finish")}
          color="success"
          onClick={onFinish}
        >
          <DoneSharpIcon fontSize="medium" />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <IconButton
          aria-label={t("ButtonsFinishCancelLarge_cancel")}
          color="error"
          onClick={onCancel}
        >
          <ClearSharpIcon fontSize="medium" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
