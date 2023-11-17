import { AlertColor } from "@mui/material/Alert";
import React, { useState, createRef, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UpdateProfile from "./update-profile";
import { ImageUpload } from "./../file-upload/image-upload";
import {
  Ucfirst,
  mobileFormat,
  dateTimeFormat,
} from "./../../helper/commonFunctions";
import {
  updateProfilePicture,
  userDetails,
  USER_PROFILE_FETCH_SUCCESS,
} from "./../../actions/common/user";

function MyAccount(props: any) {
  const ref = createRef<any>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [profileDetails, setProfileDetails] = useState<any>(null);

  const { showMessage } = useOutletContext<{
    showMessage: (type: AlertColor, message: string) => void;
  }>();

  useEffect(() => {
    userDetails(props.dispatch, navigate).then((res) => {
      if (res.status === 200) {
        setProfileDetails(res.data);
        setProfileImg(res.data.image);
      }
    });
  }, []);

  const updateOpen = () => {
    setOpen(true);
  };

  const updateClose = () => {
    props.dispatch({
      type: USER_PROFILE_FETCH_SUCCESS,
      payload: {
        user: {},
      },
    });
    setOpen(false);
  };

  const onSelectFile = (e: any) => {
    ref.current.onSelectFile(e);
  };

  const uploadRes = (data: any) => {
    let params = {
      url: data.url,
    };
    updateProfilePicture(params, navigate).then((res) => {
      if (res.status === 200) {
        setProfileImg(data.url);
        showMessage("success", t("Profile picture updated successfully."));
      }
    });
  };

  return (
    <React.Fragment>
      <Card variant="outlined" style={{ width: "100%" }}>
        <CardHeader
          avatar={
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <IconButton size="small" color="secondary" className="button">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="upload"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      opacity: 0,
                    }}
                    id="image"
                  />
                  <CameraAltIcon />
                </IconButton>
              }
            >
              <Avatar
                src={profileImg ? profileImg : "/img/profile.jpg"}
                alt={
                  profileDetails ? Ucfirst(profileDetails.first_name) : "Image"
                }
                sx={{ width: 100, height: 100 }}
              >
                R
              </Avatar>
            </Badge>
          }
          action={
            <IconButton
              size="small"
              color="secondary"
              className="button"
              onClick={updateOpen}
            >
              <EditIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: "h3" }}
          title={
            profileDetails
              ? Ucfirst(profileDetails.first_name) +
                " " +
                Ucfirst(profileDetails.last_name)
              : ""
          }
        />
        <CardContent className="card-content">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <Typography color="secondary">{t("Email")}</Typography>
                </Grid>
                <Grid item xs={7}>
                  {profileDetails ? profileDetails.email : ""}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <Typography color="secondary">
                    {t("Mobile Number")}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  {profileDetails
                    ? profileDetails.countrycode +
                      " " +
                      mobileFormat(profileDetails.mobile)
                    : ""}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <Typography color="secondary">{t("Gender")}</Typography>
                </Grid>
                <Grid item xs={7}>
                  {profileDetails ? profileDetails.gender : ""}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <Typography color="secondary">{t("Status")}</Typography>
                </Grid>
                <Grid item xs={7}>
                  {profileDetails && profileDetails.status ? (
                    <Chip size="small" label="Active" color="success" />
                  ) : (
                    <Chip size="small" label="Inactive" color="error" />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container spacing={1} alignItems="center">
            <Grid item sm={6}>
              <Typography color="secondary" component="span">
                {t("Profile Updated at")}:
              </Typography>{" "}
              {profileDetails ? dateTimeFormat(profileDetails.updatedAt) : ""}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {open ? <UpdateProfile open={open} updateClose={updateClose} /> : null}
      <ImageUpload ref={ref} defaultAspect={4 / 4} uploadRes={uploadRes} />
    </React.Fragment>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(MyAccount);
