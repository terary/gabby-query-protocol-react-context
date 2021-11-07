/* eslint-disable import/prefer-default-export */
/*
  To use this, three things need to happen.
    1) Put the container somewhere sane

      <GabbyToastContainer />

    2) Import this file wherever it will be used (normal usage, but it still needs to happen)
    3) Import the css (see below)

  
  For better instructions see the package this wraps over:
    https://www.npmjs.com/package/material-react-toastify
*/

import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { AlertContainer } from "./AlertContainer";
import { useApplicationUtilities } from "../";
type GabbyToastProps = {
  message: string;
  title?: string;
};
type GabbyErrorToastProps = GabbyToastProps & {
  debug?: any;
};

const GabbyToast = {
  error: ({ message, title = "Error", debug }: GabbyErrorToastProps): void => {
    if (debug !== undefined) {
      console.dir({ error: debug });
    }
    toast.error(<AlertContainer message={message} title={title} severity="error" />);
  },

  info: ({ message, title = "Info" }: GabbyToastProps): void => {
    toast.info(<AlertContainer message={message} title={title} severity="info" />);
  },

  success: ({ message, title = "Success" }: GabbyToastProps): void => {
    toast.success(<AlertContainer message={message} title={title} severity="success" />);
  },

  warn: ({ message, title = "Warning" }: GabbyToastProps): void => {
    toast.warn(<AlertContainer message={message} title={title} severity="warning" />);
  },
};

const GabbyToastContainer = () => {
  const currentLocale = useApplicationUtilities().getCurrentLocale();

  return (
    <ToastContainer
      limit={3}
      closeOnClick
      newestOnTop
      pauseOnFocusLoss
      position={currentLocale.languageDir === "rtl" ? "top-left" : "top-right"}
      hideProgressBar={false}
    />
  );
};

export { GabbyToast, GabbyToastContainer };
