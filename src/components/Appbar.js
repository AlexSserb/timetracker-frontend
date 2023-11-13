import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

// Главная панель приложения
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
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            TimeTracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerClose}>
        <List>
          <ListItem component={Link} to="/">
            <ListItemText primary="Редактирование рабочего дня" />
          </ListItem>
          <ListItem component={Link} to="/userEdit">
            <ListItemText primary="Редактирование пользователей" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Appbar;
