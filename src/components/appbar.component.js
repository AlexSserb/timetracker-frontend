import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import authService from '../services/auth.service';

// Main application bar with humburger menu
const Appbar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            <List>
              <ListItem component={Link} to="/">
                <ListItemText primary="Редактирование рабочего дня" />
              </ListItem>
              <ListItem component={Link} to="/projectEdit">
                <ListItemText primary="Редактирование проектов" />
              </ListItem>
              <ListItem component={Link} to="/jobEdit">
                <ListItemText primary="Редактирование должностей" />
              </ListItem>
              <ListItem component={Link} to="/userEdit">
                <ListItemText primary="Редактирование пользователей" />
              </ListItem>
              <ListItem component={Link} to="/statisticsAllUsers">
                <ListItemText primary="Статистика всех пользователей" />
              </ListItem>
              <ListItem component={Link} to="/statisticsUserByWeeks">
                <ListItemText primary="Статистика пользователя" />
              </ListItem>
              <ListItem component={Link} to="/logout">
                <ListItemText primary="Выйти" />
              </ListItem>
            </List>
          </Drawer>
          ) : (<div></div>)
        }
    </div>
  );
};

export default Appbar;
