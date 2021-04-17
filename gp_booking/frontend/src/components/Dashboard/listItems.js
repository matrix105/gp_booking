import React from "react";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TodayIcon from "@material-ui/icons/Today";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";

function ListItemLink(props) {
  const { to } = props;

  const CustomLink = (props) => <Link to={to} {...props} />;

  return <ListItem button component="a" component={CustomLink} {...props} />;
}

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemLink to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemLink to="/dashboard/booking">
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemLink to="/dashboard/patients">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemLink to="/dashboard/doctors">
        <ListItemIcon>
          <LocalHospitalOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItemLink>
    </ListItem>
    <ListItem button>
      <ListItemLink to="/dashboard/presctiptions">
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Prescriptions" />
      </ListItemLink>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
