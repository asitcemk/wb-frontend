import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Order = "asc" | "desc";

interface SortMenuProps {
  handleSort: (order: Order) => void;
  order: string;
}


export default function SortMenu(props: SortMenuProps) {
  const { handleSort, order } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onHandleSort = (
    event: React.MouseEvent<HTMLElement>,
    value: Order
  ) => {
    handleSort(value);
    handleClose();
  };

  return (
    <div>
      <Button
        id="user-sort"
        aria-controls={open ? "user-sort" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Created Date: {order === "asc" ? "ASC" : "DESC"}
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="user-sort"
        aria-labelledby="user-sort"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem value="asc" onClick={(event) => onHandleSort(event, "asc")}>
          Created Date : ASC
        </MenuItem>
        <MenuItem value="desc" onClick={(event) => onHandleSort(event, "desc")}>
          Created Date : DESC
        </MenuItem>
      </Menu>
    </div>
  );
}
