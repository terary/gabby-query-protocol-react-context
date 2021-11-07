import * as React from "react";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import MuiListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useApplicationUtilities } from "../Application";
import { NavLink, useLocation } from "react-router-dom";
import { customStyles } from "../Application";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

import { HOME_DIR } from "./common";
import { BrandingWatermark } from "@mui/icons-material";

type MyNavLinkProps = {
  to: string;
  Icon: typeof DashboardIcon;
  text: string;
};

const NavLinkStyled = styled(NavLink)<ListItemProps>(({ theme }) => ({
  //   color: theme.palette.getContrastText(purple[500]),
  color: customStyles.longText,
  // backgroundColor: purple[500],
  // "&:hover": {
  //   backgroundColor: purple[700],
  // },
}));

const MyNavLink = ({ to, Icon, text }: MyNavLinkProps) => {
  const { pathname } = useLocation();

  const activeRoute = () => {
    return to === pathname;
  };

  return (
    <ListItem
      selected={activeRoute()}
      component={NavLinkStyled}
      to={to}
      button
      // dense
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={`${text}`} />
    </ListItem>
  );
};

export const NavListMain = () => {
  const { t } = useApplicationUtilities();
  return (
    <List>
      <MyNavLink to={`${HOME_DIR}`} Icon={DashboardIcon} text={t("Home")} />
      <MyNavLink
        to={`${HOME_DIR}predicate-demo`}
        Icon={LayersIcon}
        text={t("Predicate Tree (build)")}
      />
      {/* <MyNavLink
        to={`${HOME_DIR}predicate-demo`}
        Icon={LayersIcon}
        text={t("Predicate Tree (uses)")}
      /> */}
      <MyNavLink
        to={`${HOME_DIR}projection-demo`}
        Icon={LayersIcon}
        text={t("Projections (Columns)")}
      />
      <MyNavLink
        to={`${HOME_DIR}application-features`}
        Icon={DashboardIcon}
        text={t("Application Features")}
      />
      <MyNavLink to={`${HOME_DIR}blank-page`} Icon={PeopleIcon} text={t("Blank Page")} />

      <ListSubheader inset>{t("Filler Not Used")}</ListSubheader>

      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={t("Customers")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={t("Reports")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary={t("Integrations")} />
      </ListItem>
    </List>
  );
};
