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
import { Link, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";
import Modal from "@mui/material/Modal";

import TuniLogo from "./Assets/Tuni full logo.svg";

import MenImg1 from "../Header/Assets/Collectio_Icon_copy.webp";
import MenImg2 from "../Header/Assets/New.webp";
import MenImg3 from "../Header/Assets/7.avif";
import MenImg4 from "../Header/Assets/8.avif";
import MenImg5 from "../Header/Assets/9.avif";

import TshirtHalf1 from "./Assets/tshirt.gif";
import TshirtHalf2 from "./Assets/tshirt (1).gif";
import TshirtHalf3 from "./Assets/charity.gif";
import TshirtHalf4 from "./Assets/shirt.gif";
import TshirtHalf5 from "./Assets/long-sleeves.gif";

import MenImg6 from "../Header/Assets/1 (1).avif";
import MenImg7 from "../Header/Assets/3.avif";
import MenImg8 from "../Header/Assets/4.avif";
import MenImg9 from "../Header/Assets/5.avif";
import MenImg10 from "../Header/Assets/6.avif";

import React, { useState, useEffect } from "react";
import AddToCart from "../AddToCart/AddToCart";
import Men from "./SubDropDown/Men";
import CartItem from "../AddToCart/CartItem";
import "./Header.css";
import Login from "../Login/Login";
import { auth, provider, firestore } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Declaring some constants
const drawerWidth = 260;
const navItems = [
  "JoggerMen",
  "Women",
  "Summer T-Shirts",
  "Oversized T-Shirts",
];

const DrawerAppBar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpenShirt, setSubmenuOpenShirt] = useState(false);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const closeSubmenu = () => {
    setSubmenuOpen(false);
  };

  // shirt

  const handleSubmenuToggleShirt = () => {
    setSubmenuOpenShirt(!submenuOpenShirt);
  };

  const closeSubmenuShirt = () => {
    setSubmenuOpenShirt(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const [open, setOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // ---------------------------------------
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setOpenModal(false);
      } else {
        setUser(null);
        setOpenModal(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("rzp_device_id");
      localStorage.clear();
      localStorage.removeItem("rzp_checkout_anon_id");
      toast.success("Successfully Logout");
      navigate("/");
      await auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // small screen
  const drawer = (
    <Box>
      <Typography variant="h6">
        <div className="d-flex justify-content-end mx-3 my-1">
          <button className="border-0" onClick={handleDrawerToggle}>
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
        <div className="text-center">
          {" "}
          <img
            src={TuniLogo}
            alt="Logo"
            style={{ width: "60px", height: "60px" }}
          />{" "}
        </div>
      </Typography>
      <Divider />
      <List>
        <Typography>
          <div
            className="small_nav_bar_heading fw-bold fs-5 mx-3"
            style={{ marginTop: "-15px" }}
          >
            Men
          </div>
          <List component="nav" className="submenu-wrapper">
            <ListItem>
              <ListItemButton
                onClick={handleSubmenuToggle}
                className="fw-bold"
                style={{ marginTop: "-15px" }}
              >
                <i className="bi bi-handbag mx-1 "></i> T-Shirt
              </ListItemButton>
            </ListItem>
            {submenuOpen && (
              <>
                <ListItem>
                  <Link
                    to="/HalfHandTshirt"
                    style={{ textDecoration: "none", marginTop: "-25px" }}
                  >
                    <ListItemButton onClick={closeSubmenu}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf2}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Half Hand T-Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/FullHandTshirt"
                    style={{ textDecoration: "none", marginTop: "-28px" }}
                  >
                    <ListItemButton onClick={closeSubmenu}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf2}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Full Hand T-Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/CollarTshirt"
                    style={{ textDecoration: "none", marginTop: "-28px" }}
                  >
                    <ListItemButton onClick={closeSubmenu}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf3}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Collar T-Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>

                {/*  */}

                <ListItem>
                  <Link
                    to="/RoundNeck"
                    style={{ textDecoration: "none", marginTop: "-28px" }}
                  >
                    <ListItemButton onClick={closeSubmenu}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf3}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Round Neck T-Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    to="/VNeck"
                    style={{ textDecoration: "none", marginTop: "-28px" }}
                  >
                    <ListItemButton onClick={closeSubmenu}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf3}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        V-Neck T-Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            )}
            {/* shirt */}
            <ListItem>
              <ListItemButton
                onClick={handleSubmenuToggleShirt}
                className="fw-bold"
                style={{ marginTop: "-15px" }}
              >
                <i className="bi bi-handbag mx-1 "></i> Shirt
              </ListItemButton>
            </ListItem>
            {submenuOpenShirt && (
              <>
                <ListItem>
                  <Link
                    to="/HalfHandTshirt"
                    style={{ textDecoration: "none", marginTop: "-25px" }}
                  >
                    <ListItemButton onClick={closeSubmenuShirt}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf4}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Half Hand Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/FullHandTshirt"
                    style={{ textDecoration: "none", marginTop: "-28px" }}
                  >
                    <ListItemButton onClick={closeSubmenuShirt}>
                      <div className="img_size_small_dev">
                        <img
                          src={TshirtHalf5}
                          alt="TshirtHalf"
                          className="img-fluid"
                        ></img>{" "}
                        Full Hand Shirt
                      </div>
                    </ListItemButton>
                  </Link>
                </ListItem>

                {/* Add more submenu items here if needed */}
              </>
            )}

            <ListItem>
              <ListItemButton>
                <i className="bi bi-handbag mx-2"></i> Short
              </ListItemButton>
            </ListItem>
          </List>
        </Typography>

        <Typography>
          <ListItem>
            <Link
              to="/MensCombo"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginTop: "-24px",
              }}
            >
              <ListItemButton>
                <h6
                  className="fw-bold fs-6 blinksmall"
                  style={{ marginLeft: "-20px" }}
                >
                  Men's Combo <span className="badge text-bg-danger">New</span>
                </h6>
              </ListItemButton>
            </Link>
          </ListItem>
        </Typography>
        <Typography>
          <ListItem>
            <Link
              to="/WomensCombo"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginTop: "-24px",
              }}
            >
              <ListItemButton>
                <h6
                  className="fw-bold fs-6 blinksmall"
                  style={{ marginLeft: "-20px" }}
                >
                  Women's Combo{" "}
                  <span className="badge text-bg-danger">New</span>
                </h6>
              </ListItemButton>
            </Link>
          </ListItem>
        </Typography>
        <Typography>
          <ListItem>
            <Link
              to="/WomensCombo"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginTop: "-24px",
              }}
            >
              <ListItemButton>
                <h6
                  className="fw-bold fs-6 fadeBlink"
                  style={{ marginLeft: "-20px" }}
                >
                  Co-Living Combos <span className="badge text-bg-danger">New</span>
                </h6>
              </ListItemButton>
            </Link>
          </ListItem>
        </Typography>

        <Typography>
          <div className="small_nav_bar_heading fw-bold fs-5 mx-3">Women</div>
          <ListItem>
            <ListItemButton>
              <i className="bi bi-person-standing-dress mx-2"></i> Pant
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i className="bi bi-person-standing-dress mx-2"></i> T-Shirt
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <i className="bi bi-person-standing-dress mx-2"></i> Short
            </ListItemButton>
          </ListItem>
        </Typography>

        <ListItem></ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div className="contai" style={{ zIndex: "2" }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            component="nav"
            sx={{ backgroundColor: "#F8F8F8", marginTop: "30px" }}
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
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <i class="bi bi-people text-black mx-2 fs-3" />
                      </Button>
                      {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Link to="">
                          {" "}
                          <MenuItem onClick={handleClose}>
                            Log In or Sign Up
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </Menu> */}
                    </div>{" "}
                    <div className="d-flex justify-content-end mx-2 px-1">
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
                  <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <ul
                  className="d-none d-md-flex text-black fw-bold fw-bold"
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <a href="/" className="text-decoration-none text-black ">
                    {" "}
                    <li className=" mx-2 fw-bold heading_hover">Home</li>
                  </a>

                  <li>
                    <div className="dropdown">
                      <button className="dropbtn fw-semibold heading_hover">
                        Men
                      </button>
                      <div className="dropdown-content">
                        <Men />
                      </div>
                    </div>
                  </li>

                  <div className="dropdown">
                    <button className="dropbtn fw-semibold heading_hover">
                      Women
                    </button>
                    <div className="dropdown-content">
                      <div className="menu-links my-3 px-2">
                        <div className="menu_img mx-2 ">
                          <a href="/WomenPant">
                            <img
                              src={MenImg6}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1"> T-shirts</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="/WomenPant">
                            <img
                              src={MenImg7}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Co-ord-sets</h6>
                        </div>
                        <div className="menu_img mx-2">
                          <a href="/WomenPant">
                            <img
                              src={MenImg8}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">Joggers-men</h6>
                        </div>

                        <div className="menu_img mx-2">
                          <a href="/WomenPant">
                            <img
                              src={MenImg9}
                              alt="im1"
                              className="img-fluid"
                            />
                          </a>
                          <h6 className="text-center px-1">T-shirt-dress</h6>
                        </div>

                        <div className="menu_img mx-2">
                          <a href="/WomenPant">
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
                  <a href="/MensCombo" class="text-decoration-none text-black">
                    <li class="px-3 bounceBlink position-relative">
                      <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">
                        NEW
                      </span>
                      Men's Combo Offers
                    </li>
                  </a>

                  <a
                    href="/WomensCombo"
                    class="text-decoration-none text-black"
                  >
                    <li class="px-3 blinks position-relative ">
                      <span class="badge bg-danger position-absolute top-0  start-100 translate-middle">
                        NEW
                      </span>
                      Women's Combo Offers
                    </li>
                  </a>

                  <a
                    href="/WomensCombo"
                    class="text-decoration-none text-black"
                  >
                    <li class="px-3 fadeBlink  position-relative ">
                      <span class="badge bg-danger position-absolute top-0  start-100 translate-middle">
                        NEW
                      </span>
                      Co-Living Combos
                    </li>
                  </a>
                </ul>
              </Box>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
                    <div className="bg-info" style={{ zIndex: "1000" }}>
                      <div>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <Link
                            to="/TrackOrder"
                            className="text-decoration-none text-black"
                          >
                            <MenuItem
                              onClick={handleClose}
                              className="subdropdown_hover"
                            >
                              Track Order
                            </MenuItem>
                          </Link>
                          <Link
                            to="/Contact"
                            className="text-decoration-none text-black"
                          >
                            {" "}
                            <MenuItem
                              onClick={handleClose}
                              className="subdropdown_hover"
                            >
                              Contact
                            </MenuItem>
                          </Link>
                          <Link
                            to="/Account"
                            className="text-decoration-none text-black"
                          >
                            {" "}
                            <MenuItem
                              onClick={handleClose}
                              className="subdropdown_hover"
                            >
                              My account
                            </MenuItem>
                          </Link>
                          <Link
                            to="/ReferAndWallet"
                            className="text-decoration-none text-black"
                          >
                            {" "}
                            <MenuItem
                              onClick={handleClose}
                              className="subdropdown_hover"
                            > Refer Code
                            </MenuItem>
                          </Link>
                         
                          {user ? (
                            <IconButton color="inherit">
                              <Button
                                onClick={logout}
                                className="text-black subdropdown_hover"
                              >
                                Logout
                              </Button>
                            </IconButton>
                          ) : (
                            <IconButton color="inherit">
                              <Button
                                onClick={handleOpenModal}
                                className="text-black subdropdown_hover"
                              >
                                Login
                              </Button>
                            </IconButton>
                          )}
                        </Menu>

                        <Modal
                          open={openModal}
                          onClose={handleCloseModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 900,
                              maxWidth: "90%",
                              maxHeight: "90vh",
                              overflowY: "auto",
                              bgcolor: "rgb(21,26,61)",
                              boxShadow: 24,
                              p: 4,
                              position: "relative",
                              borderRadius: "10px",
                              border: "2px solid #E5E9EE",
                            }}
                          >
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                              onClick={handleCloseModal}
                            >
                              <i class="bi bi-x-lg text-bold text-white "></i>
                            </IconButton>
                            <Login />
                          </Box>
                        </Modal>
                      </div>
                    </div>
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
                    <div className="offcanvas-body overflow-y-auto">
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
          <Box component="main" sx={{ p: 1 }}>
            <Toolbar />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default DrawerAppBar;
