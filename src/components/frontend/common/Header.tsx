import React, { createRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChangeLanguage from "./../../common/change-language";
import Login from "./../login";

export default function Header(props: any) {
  const { showMessage } = props;
  const ref = createRef<any>();

  const isJsonStringified = (str: any): any => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  };

  const user = isJsonStringified(localStorage.getItem("_user"));

  const loginOpen = () => {
    ref.current?.handleOpen();
  };

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onRegistrationClick = () => {
    navigate("/registration");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const onMyAccountClick = () => {
    handleMenuClose();
    navigate("/my-account");
  };

  const handleLogout = () => {
    localStorage.removeItem("_auth");
    localStorage.removeItem("_user");
    handleMenuClose();
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onMyAccountClick}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
              onClick={navigateToHome}
            >
              Wowbridge
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {localStorage.getItem("_auth") ? (
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {user && user.image ? (
                    <Avatar alt="Image" variant="rounded" src={user.image} />
                  ) : (
                    <AccountCircle />
                  )}
                  {user ? user.first_name : ""}
                </IconButton>
              ) : null}
            </Box>
            {!localStorage.getItem("_auth") ? (
              <>
                <Button color="inherit" onClick={onRegistrationClick}>
                  Registration
                </Button>
                <Button color="inherit" onClick={loginOpen}>
                  Login
                </Button>
              </>
            ) : null}
            <ChangeLanguage />
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Login ref={ref} showMessage={showMessage} />
    </>
  );
}
