import React, { Profiler, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

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
          <ListItem component={Link} to="/projectEdit">
            <ListItemText primary="Редактирование проектов" />
          </ListItem>
          <ListItem component={Link} to="/statistics">
            <ListItemText primary="Статистика" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Appbar;
