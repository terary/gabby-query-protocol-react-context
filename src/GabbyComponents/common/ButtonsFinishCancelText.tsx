/* eslint-disable import/prefer-default-export */
import Button from "@mui/material/Button";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

interface Props {
  onFinish: () => void;
  onCancel: () => void;
}

export const ButtonsFinishCancelText = ({ onFinish, onCancel }: Props): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <Grid container spacing="3">
      <Grid item xs={6}>
        <Button
          aria-label={t("ButtonsFinishCancelLarge_finish")}
          color="success"
          fullWidth
          onClick={onFinish}
          startIcon={<DoneSharpIcon />}
          variant="outlined"
        >
          {t("ButtonsFinishCancelLarge_finish")}
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          aria-label={t("ButtonsFinishCancelLarge_cancel")}
          color="error"
          fullWidth
          onClick={onCancel}
          startIcon={<ClearSharpIcon />}
          variant="outlined"
        >
          {t("ButtonsFinishCancelLarge_cancel")}
        </Button>
      </Grid>
    </Grid>
  );
};
