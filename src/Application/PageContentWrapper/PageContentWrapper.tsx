import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AppTitleBar } from "./components/AppTitleBar";
import { AppSideDrawer } from "./components/AppSideDrawer";
import { useTheme } from "@mui/material/styles";
interface Props {
  children?: React.ReactNode;
}
export function PageContentWrapper({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppTitleBar titleText="I18N Needed Here" isOpen={open} toggleDrawer={toggleDrawer} />
      <AppSideDrawer isOpen={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.grey[100],
          // backgroundColor: (theme) =>
          //   theme.palette.mode === "light"
          //     ? theme.palette.grey[100]
          //     : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar /> {/** Consumes space, keeps page layout sane, no other purpose */}
        {children}
        {/* <span>Blank Page</span> */}
      </Box>
    </Box>
  );
}
