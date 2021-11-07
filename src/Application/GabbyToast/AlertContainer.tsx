import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type AlertContainerProps = {
  message: string;
  title?: string;
  severity: "error" | "info" | "success" | "warning";
};

const AlertContainer = ({ message, title = "Info", severity }: AlertContainerProps) => {
  return (
    <Alert severity={severity} sx={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
      <AlertTitle>{title}</AlertTitle>
      {message} — <strong>check it out!</strong>
    </Alert>
  );
};

export { AlertContainer };
