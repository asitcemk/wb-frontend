import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import { gridText } from "./../../helper/commonFunctions";
import { fetchColumns } from "./../../actions/common/columns";
import { getData } from "./../../actions/common/grid";
import GridToolbar from "./grid-toolbar";
import GridLoader from "./grid-loader";
import GridHead, { Data } from "./grid-head";

type Order = "asc" | "desc";

export default function GridView(props: any) {
  const {
    heading,
    addUrl,
    listName,
    ColumnFetchApi,
    DataFetchApi,
    viewURL,
    editURL,
    statusApi,
    deleteApi,
    token,
  } = props;

  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = React.useState([]);
  const [filterColumns, setFilterColumns] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [status, setStatus] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [filterArr, setFilterArr] = useState([]);

  //toolbar
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const [columnopen, setColumnopen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const CURL = ColumnFetchApi + "/" + listName;
  const URL = DataFetchApi;

  const fetchData = (
    url: string,
    page: number,
    limit: number,
    search: string,
    status: string,
    filterArr: any,
    orderBy: string,
    order: string
  ) => {
    setIsLoaded(false);
    let filterStr = "";
    filterArr.map((r: any, i: any) => {
      return (filterStr +=
        "&filter=" + r.columns + "," + r.operation + "," + r.value);
    });
    page = page + 1;
    let qs = "";
    qs = page ? qs + "?page=" + page : qs;
    qs = limit ? qs + "&limit=" + limit : qs;
    qs = search ? qs + "&search=" + search : qs;
    qs = status ? qs + "&status=" + status : qs;
    qs = orderBy ? qs + "&orderBy=" + orderBy : qs;
    qs = order ? qs + "&order=" + order : qs;
    qs = filterStr ? qs + filterStr : qs;
    url = url + qs;
    navigate({
      pathname: pathname,
      search: qs,
    });
    getData(url, navigate, token).then((res: any) => {
      if (res?.status === 200) {
        setResult(res.data.result);
        setCount(res.data.count);
        setPage(page - 1);
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    fetchColumns(CURL, navigate, token).then((res) => {
      if (res.status === 200) {
        setColumns(JSON.parse(res.data.json_columns));
        setSelectedColumns(JSON.parse(res.data.json_columns));
        let selColumns = JSON.parse(res.data.json_columns);
        const filColumns: any = [];
        for (var i = 0; i < selColumns.length; i++) {
          if (selColumns[i].filter === true) {
            filColumns.push(selColumns[i]);
          }
        }
        setFilterColumns(filColumns);
        //data
        var newFilterArr: any = [];
        var newPage: any = page;
        var newLimit: any = rowsPerPage;
        var newSearch: any = searchTxt;
        var newOrderBy: any = orderBy;
        var newOrder: any = order;
        var newStatus: any = status;

        if (searchParams && searchParams.size > 0) {
          newLimit = Number(searchParams.get("limit")) ?? rowsPerPage;
          newSearch = searchParams.get("search") ?? searchTxt;
          newStatus = searchParams.get("status") ?? status;
          newOrderBy = searchParams.get("orderBy") ?? orderBy;
          newOrder = searchParams.get("order") ?? order;
          setRowsPerPage(newLimit);
          setSearchTxt(newSearch);
          setOrderBy(newOrderBy);
          setOrder(newOrder);
          setStatus(newStatus);
        }

        fetchData(
          URL,
          newPage,
          newLimit,
          newSearch,
          newStatus,
          newFilterArr,
          newOrderBy,
          newOrder
        );
      }
    });
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    fetchData(
      URL,
      0,
      rowsPerPage,
      searchTxt,
      status,
      filterArr,
      property,
      newOrder
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = result.map((n: any) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    fetchData(
      URL,
      newPage,
      rowsPerPage,
      searchTxt,
      status,
      filterArr,
      orderBy,
      order
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchData(
      URL,
      0,
      parseInt(event.target.value, 10),
      searchTxt,
      status,
      filterArr,
      orderBy,
      order
    );
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(event.target.value);
    fetchData(
      URL,
      0,
      rowsPerPage,
      event.target.value,
      status,
      filterArr,
      orderBy,
      order
    );
  };

  const confirmationOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    setConfirmOpen(true);
    setConfirmType(value);
  };

  const confirmationClose = () => {
    setConfirmOpen(false);
  };

  const refreshGrid = (event: React.MouseEvent<HTMLButtonElement>) => {
    fetchData(
      URL,
      page,
      rowsPerPage,
      searchTxt,
      status,
      filterArr,
      orderBy,
      order
    );
    setSelected([]);
  };

  const changeColumn = (newColumn: any) => {};

  const columnOpen = () => {
    setColumnopen(true);
  };

  const columnClose = () => {
    setColumnopen(false);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <>
      <Grid container direction="row" spacing={0}>
        <Grid container sm={10} xs={10}>
          <Typography variant="h4">{heading}</Typography>
        </Grid>
        <Grid container sm={2} xs={2} justifyContent="flex-end">
          {addUrl && addUrl !== "#" && (
            <Link to={addUrl}>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Link>
          )}
        </Grid>
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <GridToolbar
            numSelected={selected.length}
            handleSearch={handleSearch}
            searchTxt={searchTxt}
            editURL={editURL}
            viewURL={viewURL}
            selected={selected}
            confirmOpen={confirmOpen}
            confirmType={confirmType}
            confirmationOpen={confirmationOpen}
            confirmationClose={confirmationClose}
            statusApi={statusApi}
            deleteApi={deleteApi}
            token={token}
            refreshGrid={refreshGrid}
            columnopen={columnopen}
            listName={listName}
            columns={columns}
            selectedColumns={selectedColumns}
            changeColumn={changeColumn}
            columnClose={columnClose}
            columnOpen={columnOpen}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <GridHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={result.length}
                selectedColumns={selectedColumns}
              />
              {isLoaded ? (
                <TableBody>
                  {result.map((row: any, index: any) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => handleClick(event, row._id)}
                          />
                        </TableCell>
                        {selectedColumns.map((col: any, i) => {
                          return (
                            <TableCell
                              key={i}
                              className="grid-cell"
                              scope="row"
                              align={col.numeric ? "right" : "left"}
                            >
                              {gridText(col, row)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  {count === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={selectedColumns.length + 1}
                        align="center"
                      >
                        No result found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <GridLoader
                  columns={selectedColumns}
                  rowsPerPage={rowsPerPage}
                />
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  );
}
