import React from "react";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ConfirmDialog from "./confirm-dialog";
import ColumnDialog from "./grid-column";

interface GridToolbarProps {
  numSelected: number;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTxt: string;
  editURL: string;
  viewURL: string;
  selected: readonly number[];
  confirmOpen: boolean;
  confirmType: string;
  confirmationOpen: (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
  confirmationClose: () => void;
  statusApi: string;
  deleteApi: string;
  token: string;
  refreshGrid: (event: React.MouseEvent<HTMLButtonElement>) => void;
  columnopen: boolean;
  listName: string;
  columns: any;
  selectedColumns: any;
  changeColumn: (newColumn: any) => void;
  columnClose: () => void;
  columnOpen: () => void;
}

export default function GridToolbar(props: GridToolbarProps) {
  const {
    numSelected,
    handleSearch,
    searchTxt,
    editURL,
    viewURL,
    selected,
    confirmOpen,
    confirmType,
    confirmationOpen,
    confirmationClose,
    statusApi,
    deleteApi,
    token,
    refreshGrid,
    columnopen,
    listName,
    columns,
    selectedColumns,
    changeColumn,
    columnClose,
    columnOpen,
  } = props;
  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      <Stack direction="row" spacing={2}>
        {numSelected > 0 ? (
          <>
            {numSelected === 1 && viewURL !== "#" ? (
              <Tooltip title={t("View")}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<VisibilityIcon />}
                >
                  {t("View")}
                </Button>
              </Tooltip>
            ) : null}
            <Tooltip title={t("Activate")}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<LockOpenIcon />}
                onClick={(event) => confirmationOpen(event, "activate")}
              >
                {t("Activate")}
              </Button>
            </Tooltip>
            <Tooltip title={t("Deactivate")}>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<LockIcon />}
                onClick={(event) => confirmationOpen(event, "deactivate")}
              >
                {t("Deactivate")}
              </Button>
            </Tooltip>
            {numSelected === 1 && editURL !== "#" ? (
              <Tooltip title={t("Edit")}>
                <Link to={editURL + selected.toString()}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<EditIcon />}
                  >
                    {t("Edit")}
                  </Button>
                </Link>
              </Tooltip>
            ) : null}
            {deleteApi && deleteApi !== "#" ? (
              <Tooltip title={t("Delete")}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={(event) => confirmationOpen(event, "delete")}
                >
                  {t("Delete")}
                </Button>
              </Tooltip>
            ) : null}
          </>
        ) : (
          <>
            <TextField
              size="small"
              label={t("Search")}
              variant="outlined"
              onChange={handleSearch}
              value={searchTxt}
            />
            <Tooltip title="Filter list">
              <IconButton onClick={refreshGrid}>
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
      {columnopen ? (
        <ColumnDialog
          open={columnopen}
          listName={listName}
          columns={columns}
          selectedColumns={selectedColumns}
          changeColumn={changeColumn}
          token={token}
          handleClose={columnClose}
        />
      ) : null}
      {confirmOpen ? (
        <ConfirmDialog
          open={confirmOpen}
          selected={selected}
          confirmType={confirmType}
          statusApi={statusApi}
          deleteApi={deleteApi}
          refreshGrid={refreshGrid}
          token={token}
          handleClose={confirmationClose}
        />
      ) : null}
    </Toolbar>
  );
}
