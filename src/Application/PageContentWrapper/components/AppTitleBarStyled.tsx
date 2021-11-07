/* eslint-disable import/prefer-default-export */
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { APP_UI_CONST } from "./APP_UI_CONST";
import { useApplicationUtilities } from "../..";
const drawerWidth = APP_UI_CONST.APP_DRAWER_WIDTH;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppTitleBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, dir }) => {
  const currentLocale = useApplicationUtilities().getCurrentLocale();

  const dirMargin =
    currentLocale.languageDir === "ltr"
      ? { marginLeft: drawerWidth }
      : { marginRight: drawerWidth };
  console.log("dir:", currentLocale.languageDir);
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      ...dirMargin,
      // marginLeft: drawerWidth,
      // marginRight: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

// export const AppTitleBarStyled = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open, dir }) =>  ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     // marginLeft: drawerWidth,
//     // marginRight: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));
