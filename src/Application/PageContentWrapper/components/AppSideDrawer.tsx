/* eslint-disable import/prefer-default-export */
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavListMain, NavListSecondary } from "../../../Router";
import { DrawerStyled } from "./DrawerStyled";

interface Props {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export const AppSideDrawer = ({ isOpen, toggleDrawer }: Props) => {
  return (
    <DrawerStyled variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton aria-label="close drawer" onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <NavListMain />
      <Divider />
      <NavListSecondary />
    </DrawerStyled>
  );
};
