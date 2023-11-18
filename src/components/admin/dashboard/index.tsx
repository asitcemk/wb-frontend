import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";

function Dashboard(props: any) {
  const { t } = useTranslation();

  return (
    <>
    <Grid container direction="row" spacing={0}>
      <h2>{t("Welcome to Wowbridge Admin Dashboard")}</h2>
      <div style={{height:'500px'}}></div>
      </Grid>
    </>
  );
}

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
