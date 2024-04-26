import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";

import TuniLogo from "./Assets/Tuni full logo.svg";

import MenImg1 from "../Header/Assets/Collectio_Icon_copy.webp";
import MenImg2 from "../Header/Assets/New.webp";
import MenImg3 from "../Header/Assets/7.avif";
import MenImg4 from "../Header/Assets/8.avif";
import MenImg5 from "../Header/Assets/9.avif";

import MenImg6 from "../Header/Assets/1 (1).avif";
import MenImg7 from "../Header/Assets/3.avif";
import MenImg8 from "../Header/Assets/4.avif";
import MenImg9 from "../Header/Assets/5.avif";
import MenImg10 from "../Header/Assets/6.avif";

import React, { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import Men from "./SubDropDown/Men";

// Declaring some constants
const drawerWidth = 240;
const navItems = [
  "JoggerMen",
  "Women",
  "Summer T-Shirts",
  "Oversized T-Shirts",
];

const DrawerAppBar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6">
        <div className="text-center">
          {" "}
          <img
            src={TuniLogo}
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />{" "}
        </div>
      </Typography>
      <Divider />
      <List>
        <Typography>
          <div className="small_nav_bar_heading fw-bold fs-5 mx-3"> Men</div>
          <ListItem>
            <Link to="/JoggerMen" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <i class="bi bi-handbag mx-2"></i> JoggerMen
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i class="bi bi-handbag mx-2"></i> T-Shirt
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i class="bi bi-handbag mx-2"></i> Short
            </ListItemButton>
          </ListItem>
        </Typography>
        <Typography>
          <div className="small_nav_bar_heading fw-bold fs-5 mx-3">Women</div>
          <ListItem>
            <ListItemButton>
              <i class="bi bi-person-standing-dress mx-2"></i> Pant
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i class="bi bi-person-standing-dress mx-2"></i> T-Shirt
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i class="bi bi-person-standing-dress mx-2"></i> Short
            </ListItemButton>
          </ListItem>
        </Typography>

        <ListItem></ListItem>
      </List>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="container" style={{ zIndex: "2" }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            component="nav"
            sx={{ backgroundColor: "#F8F8F8", marginTop: "50px" }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none", color: "black" } }}
              >
                <MenuIcon />
              </IconButton>
              {/* Logo and icons for small screens */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", sm: "none" },
                  textAlign: "center",
                  marginLeft: "90px",
                }}
              >
                <Link to="/">
                  {" "}
                  <img
                    src={TuniLogo}
                    alt="Logo"
                    style={{ width: "60px", height: "60px", margin: "auto" }}
                  />
                </Link>
                <Box>
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginLeft: "40px",
                    }}
                  >
                    <div className="d-flex justify-content-end">
                      <div>
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <i class="bi bi-people text-black mx-2 fs-3" />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>
                            Log In or Sign Up
                          </MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <i
                        class="bi bi-bag-check text-black "
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRightcartSmall"
                        aria-controls="offcanvasRightcartSmall"
                      ></i>
                    </div>

                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="-1"
                      id="offcanvasRightcartSmall"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel" className="fw-bold fs-4">
                          Shopping Cart
                        </h5>
                        <button
                          type="button"
                          class="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* home add to cart  */}

                      <div className="offcanvas-body">
                        <AddToCart />
                      </div>
                    </div>
                  </IconButton>
                </Box>
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                <Link to="/">
                  {" "}
                  <img
                    src={TuniLogo}
                    alt="Logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginLeft: "40px",
                    }}
                  />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <ul
                  className="d-none d-md-flex text-black fw-bold"
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <div className="dropdown">
                    <button className="dropbtn">Men</button>
                    <div className="dropdown-content">
                      <div className="menu-links my-3 px-2">
                        <div className="menu_img mx-2 ">
                          <a href="/JoggerMen">
                            <img
                              src={MenImg1}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>

                          <h6 className="text-center px-1">Joggers-men</h6>
{/* ss */}
                          {/* end */}
                        </div>

                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg2}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Co-ord-sets</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg3}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">
                            Oversized-t-shirts
                          </h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg4}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">T-shirts</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg5}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">
                            Shorts-collection
                          </h6>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className="dropdown">
                    <button className="dropbtn">Women</button>
                    <div className="dropdown-content">
                      <div className="menu-links my-3 px-2">
                        <div className="menu_img mx-2 ">
                          <a href="#">
                            <img
                              src={MenImg6}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1"> T-shirts</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg7}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Co-ord-sets</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg8}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Joggers-men</h6>
                        </div>

                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg9}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">T-shirt-dress</h6>
                        </div>

                        <div className="menu_img mx-2">
                          <a href="#">
                            <img
                              src={MenImg10}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Shorts</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <li className="px-4">Summer T-Shirts</li>
                  <li className="px-4">Oversized T-Shirts</li>
                </ul>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <input
                  type="text"
                  placeholder="Search..."
                  style={{ marginRight: "25px" }}
                />
                <IconButton color="inherit">
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <i class="bi bi-people text-black mx-2 fs-3" />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>
                        Log In or Sign Up
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
                </IconButton>
                <IconButton>
                  <i
                    class="bi bi-bag-check text-black mx-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRightcart"
                    aria-controls="offcanvasRightcart"
                  ></i>

                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRightcart"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <h5 id="offcanvasRightLabel" className="fw-bold fs-4">
                        Shopping Cart
                      </h5>
                      <button
                        type="button"
                        class="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    {/* home add to cart  */}

                    <div className="offcanvas-body">
                      <AddToCart />
                    </div>
                  </div>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ p: 4 }}>
            <Toolbar />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default DrawerAppBar;
