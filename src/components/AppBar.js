import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Typography, ListItemButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import authService from '../services/AuthService';

// Main application bar with humburger menu
const Appbar = () => {
  const [open, setOpen] = useState(false);

  const itemsForManager = [
    { to: "/", label: "Редактирование рабочего дня" },
    { to: "/projectEdit", label: "Редактирование проектов" },
    { to: "/jobEdit", label: "Редактирование должностей" },
    { to: "/userEdit", label: "Редактирование пользователей" },
    { to: "/statisticsAllUsers", label: "Статистика всех пользователей" },
    { to: "/statisticsUserByWeeks", label: "Статистика пользователя" },
    { to: "/logout", label: "Выйти" }
  ]

  const itemsForOrdinalUser = [
    { to: "/", label: "Редактирование рабочего дня" },
    { to: "/logout", label: "Выйти" }
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
            <h3 className='p-3'>Меню</h3>
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
