import logo from "../../assets/medikartlogo.png"
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ApiService from "../../service/ApiService";
import Loader from '../Loader';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null); // State for category dropdown
  const [categories, setCategories] = useState([]); // State for fetched categories
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();

  // Fetch categories when the component mounts
  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to fetch categories");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
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

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCategoryMenuOpen = (event) => setCategoryAnchorEl(event.currentTarget); // Open category dropdown
  const handleCategoryMenuClose = () => setCategoryAnchorEl(null); // Close category dropdown

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <List>
        <ListItem button component={NavLink} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleCategoryMenuOpen}>
          <ListItemText primary="Categories" />
        </ListItem>
        {isAuthenticated && (
          <ListItem button component={NavLink} to="/profile" onClick={handleDrawerToggle}>
            <ListItemText primary="My Account" />
          </ListItem>
        )}
        {isAdmin && (
          <ListItem button component={NavLink} to="/admin" onClick={handleDrawerToggle}>
            <ListItemText primary="Admin" />
          </ListItem>
        )}
        {!isAuthenticated && (
          <ListItem button component={NavLink} to="/login" onClick={handleDrawerToggle}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
        {isAuthenticated && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
        <ListItem button component={NavLink} to="/cart" onClick={handleDrawerToggle}>
          <ListItemText primary="Cart" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Typography
          variant="h6"
          noWrap
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: { xs: "none", sm: "block" },
          }}
        >
        </Typography> */
        <Box
  component={NavLink}
  to="/"
  sx={{
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    pl: 4, // padding-left to move it right
  }}
>
  <img
    src={logo}
    alt="Logo"
    style={{ height: "100px", maxWidth: "auto" }} // increase height
  />
</Box>



        }

        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <InputBase
              placeholder="Search for medicines and healthcare products"
              value={searchValue}
              onChange={handleSearchChange}
              sx={{
                color: "#000",
                background: "#fff",
                borderRadius: "4px",
                padding: "0 8px",
                flexGrow: 1,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              sx={{ color: "inherit" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Box>

        {/* Links and Icons */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
          <Button color="inherit" onClick={handleCategoryMenuOpen}>
            Categories
          </Button>
          {isAuthenticated && (
            <Button component={NavLink} to="/profile" color="inherit">
              My Account
            </Button>
          )}
          {isAdmin && (
            <Button component={NavLink} to="/admin" color="inherit">
              Admin
            </Button>
          )}
          {!isAuthenticated && (
            <Button component={NavLink} to="/login" color="inherit">
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          <IconButton component={NavLink} to="/cart" color="inherit">
            <ShoppingCart />
          </IconButton>
        </Box>

        {/* Mobile Account Icon */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={handleMenuOpen}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>

      {/* Category Dropdown Menu */}
      <Menu
        anchorEl={categoryAnchorEl}
        open={Boolean(categoryAnchorEl)}
        onClose={handleCategoryMenuClose}
      >
        {loading ? ( // Check if loading
          <MenuItem disabled>
            <Loader /> {/* Show loader while categories are being fetched */}
          </MenuItem>
        ) : Array.isArray(categories) ? (
          categories.map((category) => (
            <MenuItem
              key={category.id}
              component={NavLink}
              to={`/category/${category.id}`}
              onClick={handleCategoryMenuClose}
            >
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No categories available</MenuItem> // Fallback if categories is not an array
        )}
      </Menu>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {isAuthenticated && (
          <MenuItem component={NavLink} to="/profile" onClick={handleMenuClose}>
            My Account
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem component={NavLink} to="/admin" onClick={handleMenuClose}>
            Admin
          </MenuItem>
        )}
        {isAuthenticated ? (
          <MenuItem
            onClick={() => {
              handleMenuClose();
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <MenuItem component={NavLink} to="/login" onClick={handleMenuClose}>
            Login
          </MenuItem>
        )}
        <MenuItem component={NavLink} to="/cart" onClick={handleMenuClose}>
          Cart
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;