import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Token } from "./../../actions/environment/header-configure";
import { ApiUrls } from "./../../api-urls";
import SortMenu from "./sort-menu";
import UsersLoader from "./users-loader";
import { getUsers } from "./../../actions/common/user";
import {
  Ucfirst,
  mobileFormat,
  dateTimeFormat,
} from "./../../helper/commonFunctions";

type Order = "asc" | "desc";

export default function Home(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const token = Token().commonToken;
  const URL = ApiUrls.USERSDATA;
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTxt, setSearchTxt] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = (
    url: string,
    page: number,
    limit: number,
    search: string,
    status: string,
    orderBy: string,
    order: string
  ) => {
    setIsLoaded(false);
    let qs = "";
    qs = page ? qs + "?page=" + page : qs;
    qs = limit ? qs + "&limit=" + limit : qs;
    qs = search ? qs + "&search=" + search : qs;
    qs = status ? qs + "&status=" + status : qs;
    qs = orderBy ? qs + "&orderBy=" + orderBy : qs;
    qs = order ? qs + "&order=" + order : qs;
    url = url + qs;
    navigate({
      pathname: pathname,
      search: qs,
    });
    getUsers(url, navigate, token).then((res: any) => {
      if (res?.status === 200) {
        setResult(res.data.result);
        setCount(res.data.count);
        setPage(page);
        setIsLoaded(true);
      }
    });
  };

  useEffect(() => {
    var newPage: any = page;
    var newLimit: any = limit;
    var newSearch: any = searchTxt;
    var newOrderBy: any = orderBy;
    var newOrder: any = order;
    var newStatus: any = status;
    if (searchParams && searchParams.size > 0) {
      newPage = Number(searchParams.get("page")) ?? page;
      newLimit = Number(searchParams.get("limit")) ?? limit;
      newSearch = searchParams.get("search") ?? searchTxt;
      newStatus = searchParams.get("status") ?? status;
      newOrderBy = searchParams.get("orderBy") ?? orderBy;
      newOrder = searchParams.get("order") ?? order;
      setPage(newPage);
      setLimit(newLimit);
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
      newOrderBy,
      newOrder
    );
  }, [URL]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(event.target.value);
    fetchData(URL, 1, limit, event.target.value, status, orderBy, order);
  };

  const handleSort = (order: Order) => {
    setOrder(order);
    fetchData(URL, 1, limit, searchTxt, status, orderBy, order);
  };

  const calculatePagesCount = (limit: number, count: number) => {
    // we suppose that if we have 0 items we want 1 empty page
    return count < limit ? 1 : Math.ceil(count / limit);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchData(URL, value, limit, searchTxt, status, orderBy, order);
  };

  return (
    <div style={{ margin: "15px", padding: "8px", width: "100%" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <h1>
            {count} {count > 1 ? t("Users") : t("User")} {t("Available")}
          </h1>
        </Grid>
        <Grid item xs={2} justifyContent="flex-end">
          <TextField
            label={t("Search")}
            variant="outlined"
            onChange={handleSearch}
            value={searchTxt}
          />
        </Grid>
        <Grid item xs={2} justifyContent="flex-end">
          <SortMenu handleSort={handleSort} order={order} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {isLoaded ? (
          <>
            {result.map((row: any, index: number) => {
              return (
                <Grid item xs={6} key={"user" + index}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Badge>
                          <Avatar
                            src={row.image ? row.image : "/img/profile.jpg"}
                          >
                            R
                          </Avatar>
                        </Badge>
                      }
                      titleTypographyProps={{ variant: "h5" }}
                      title={
                        row
                          ? Ucfirst(row.first_name) +
                            " " +
                            Ucfirst(row.last_name)
                          : ""
                      }
                    />
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography>
                            <EmailIcon color="primary" sx={{ fontSize: 15 }} />{" "}
                            {row ? row.email : ""}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <PhoneAndroidIcon
                              color="primary"
                              sx={{ fontSize: 15 }}
                            />{" "}
                            {row
                              ? row.countrycode + " " + mobileFormat(row.mobile)
                              : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography alignContent="baseline">
                            <TransgenderIcon
                              color="primary"
                              sx={{ fontSize: 15 }}
                            />{" "}
                            {row ? row.gender : ""}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            <MilitaryTechIcon
                              color="primary"
                              sx={{ fontSize: 15 }}
                            />{" "}
                            {row && row.status ? (
                              <Chip
                                size="small"
                                label={t("Active")}
                                color="success"
                              />
                            ) : (
                              <Chip
                                size="small"
                                label={t("Inactive")}
                                color="error"
                              />
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Grid container spacing={0} alignItems="center">
                        <Grid item sm={6}>
                          <Typography>
                            <AccessTimeIcon
                              color="primary"
                              sx={{ fontSize: 15 }}
                            />{" "}
                            {t("Created at")}{" "}
                            {row ? dateTimeFormat(row.createdAt) : ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </>
        ) : (
          <UsersLoader limit={limit} />
        )}
      </Grid>
      <br />
      <Grid container direction="row" justifyContent="space-around" spacing={0}>
        <Pagination
          count={calculatePagesCount(limit, count)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid>
    </div>
  );
}
