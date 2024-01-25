import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Typography, ListItemButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import authService from '../services/AuthService';

// Main application bar with humburger menu
const Appbar = () => {
  const [open, setOpen] = useState(false);

  const itemsForManager = [
    { to: "/", label: "Editor of the working day" },
    { to: "/projectEdit", label: "Project Editor" },
    { to: "/jobEdit", label: "Editor of Employee positions" },
    { to: "/userEdit", label: "User Editor" },
    { to: "/statisticsAllUsers", label: "Statistics of all users" },
    { to: "/statisticsUserByWeeks", label: "User statistics" },
    { to: "/logout", label: "Logout" }
  ]

  const itemsForOrdinalUser = [
    { to: "/", label: "Editor of the working day" },
    { to: "/logout", label: "Logout" }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const listItem = item => {
    return (
      <ListItem className="p-0 border-top" component={Link} to={item.to}>
        <ListItemButton className='p-3'>{item.label}</ListItemButton>
      </ListItem>
    )
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          { 
            authService.getCurrentUser() ? (
              <IconButton color="inherit" onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>
            ) : (<div></div>)
          } 
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            TimeTracker
          </Typography>
        </Toolbar>
      </AppBar>
        { authService.getCurrentUser() ? (
          <Drawer open={open} onClose={handleDrawerClose}>
            <h3 className='p-3'>Menu</h3>
            <List className='p-0 m-0 border-bottom'>
              { authService.isManagerCurrUser() ? (
                itemsForManager.map(item => listItem(item))
              ) : (
                itemsForOrdinalUser.map(item => listItem(item))
              ) }
            </List>
          </Drawer>
          ) : (<div></div>)
        }
    </div>
  );
};

export default Appbar;
