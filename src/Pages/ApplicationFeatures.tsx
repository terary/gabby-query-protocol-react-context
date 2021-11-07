import { Paper } from "@mui/material";
import { PageContentWrapper } from "../Application";
import { Button } from "@mui/material";
import { useApplicationUtilities } from "../Application/AppContextProviders/hooks";
// import { ApplicationUtilitiesContext } from "../Application/AppContextProviders/ApplicationUtilitiesProvider";

export const ApplicationFeaturesPage = (): JSX.Element => {
  const { toast } = useApplicationUtilities();

  const handleToastClick = () => {
    toast.info({ message: "This is only a message.", title: "In App Messaging" });
  };

  return (
    <PageContentWrapper>
      <Paper sx={{ m: "20px" }}>
        This site is set-up to showcase components. Its a work in progress and kind of boring.
        The two notable functionalities are:
        <ul>
          <li>Internationalization (choose your language top/right</li>
          <li>
            In-app message <Button onClick={handleToastClick}>Click here</Button>.
          </li>
        </ul>
      </Paper>
      <span>Gabby App 2</span>
    </PageContentWrapper>
  );
};
