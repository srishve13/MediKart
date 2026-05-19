import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Drawer, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ApiService from '../../service/ApiService'; // Import your ApiService for logout

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      ApiService.logout();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        borderRight: '1px solid #ddd',
        height: '100vh',
      }}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/admin"
          sx={{ borderBottom: '1px solid #ddd' }} // Add underline
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/categories"
          sx={{ borderBottom: '1px solid #ddd' }} // Add underline
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/products"
          sx={{ borderBottom: '1px solid #ddd' }} // Add underline
        >
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/admin/orders"
          sx={{ borderBottom: '1px solid #ddd' }} // Add underline
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        {/* Add Logout Button */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{ borderBottom: '1px solid #ddd', marginTop: 'auto' }} // Add underline and position it at the bottom
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Menu Icon for mobile view */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ display: { md: 'none' } }} // Hide on medium and larger screens
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for mobile view */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show on small screens only
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Sidebar for desktop view */}
      <Box
        sx={{
          width: 240,
          display: { xs: 'none', md: 'block' }, // Hide on small screens
          position: 'fixed',
        }}
      >
        {drawerContent}
      </Box>
    </Box>
  );
};

export default Sidebar;