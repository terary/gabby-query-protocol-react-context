/* eslint-disable import/prefer-default-export */
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import { AppTitleBarStyled } from "./AppTitleBarStyled";
import { useApplicationUtilities } from "../../AppContextProviders/hooks";
import { LanguageSwitcher } from "./LanguageSwitcher";
interface IAppBarProps {
  isOpen: boolean;
  titleText: string;
  toggleDrawer: () => void;
}
export const AppTitleBar = ({
  isOpen,
  titleText,
  toggleDrawer,
}: IAppBarProps): JSX.Element => {
  const { t, getLocale, getCurrentLocale } = useApplicationUtilities();
  const currentLocale = getCurrentLocale();
  const RtlToolBar = () => {
    return (
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {titleText} <br />
          {t("app-title-bar-text")}
          <br />
        </Typography>
        <LanguageSwitcher />
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginLeft: "36px",
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    );
  };

  const LtrToolBar = () => {
    return (
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {titleText} <br />
          {t("app-title-bar-text")}
          <br />
        </Typography>
        <LanguageSwitcher />
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    );
  };

  return (
    <AppTitleBarStyled open={isOpen} dir="ltr">
      {currentLocale.languageDir === "ltr" && <LtrToolBar />}
      {currentLocale.languageDir === "rtl" && <RtlToolBar />}
    </AppTitleBarStyled>
  );
};
