import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useApplicationUtilities } from "../Application";

import AssignmentIcon from "@mui/icons-material/Assignment";

export const NavListSecondary = () => {
  const { t } = useApplicationUtilities();

  return (
    <List>
      <ListSubheader inset>{t("Saved reports")}</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={t("Orders")} />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={t("Current month")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={t("Last quarter")} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={t("Year-end sale")} />
      </ListItem>
    </List>
  );
};
