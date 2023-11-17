import { createRef } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AlertColor } from "@mui/material/Alert";
import Header from "./Header";
import Footer from "./Footer";
import { Messages } from "./../../message";

const Layout = (props: any) => {
  const ref = createRef<any>();

  const showMessage = (type: AlertColor, message: string) => {
    ref.current.handleOpen(type, message);
  };

  return (
    <>
      <Header showMessage={showMessage} />
      <Grid container spacing={0} minHeight={700}>
        <Outlet context={{ showMessage: showMessage }} />
      </Grid>
      <Footer />
      <Messages ref={ref} />
    </>
  );
};

export default Layout;
