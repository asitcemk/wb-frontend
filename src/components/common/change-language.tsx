import React from "react";
import { withTranslation } from "react-i18next";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popper from '@mui/material/Popper';

const ChangeLanguage = ({ i18n }:{i18n:any}):any => {
	const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const openLanguage = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeLanguage = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const setLanguage = (event: React.MouseEvent<HTMLElement>, value: string) => {
    i18n.changeLanguage(value);
    closeLanguage(event);
  };

	  return (
		<>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={openLanguage}
          color="inherit"
        >
          {(i18n.language)?i18n.language:"en"}<ExpandMoreIcon/>
        </Button>
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
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={closeLanguage}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem value="bn" onClick={(event) => setLanguage(event, 'bn')}>বাংলা</MenuItem>
	                  <MenuItem value="en" onClick={(event) => setLanguage(event, 'en')}>English</MenuItem>
	                  <MenuItem value="hindi" onClick={(event) => setLanguage(event, 'hindi')}>हिंदी</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
	  );
};

export default withTranslation("translations")(ChangeLanguage);