import { AlertColor } from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import React, { createRef } from "react";
import { Outlet } from "react-router-dom";
import ChangeLanguage from "./../../common/change-language";
import { Messages } from "./../../message";

export default function LayoutLogin(props: any) {
  const ref = createRef<any>();

  const showMessage = (type: AlertColor, message: string) => {
    ref.current.handleOpen(type, message);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="flex-end">
        <ChangeLanguage />
      </Grid>
      <Outlet context={{ showMessage: showMessage }} />
      <Messages ref={ref} />
    </React.Fragment>
  );
}
