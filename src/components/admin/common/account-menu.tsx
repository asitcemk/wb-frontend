import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { useNavigate } from "react-router-dom";

const AccountMenu = ({ i18n }: { i18n: any }): any => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const logout = (event: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("_admin_auth");
    closeMenu(event);
    navigate("/admin");
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        size="large"
        edge="end"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={openMenu}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem value="bn">{t("My Account")}</MenuItem>
                  <MenuItem value="logout" onClick={logout}>
                    {t("Logout")}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default withTranslation("translations")(AccountMenu);
