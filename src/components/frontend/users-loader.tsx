import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

interface UsersLoaderProps {
  limit: number;
}

export default function UsersLoader(props: UsersLoaderProps) {
  const { limit } = props;
  const rows = [];
  var count = 10;
  count = limit > 25 ? 25 : limit;
  for (var i = 0; i < count; i++) {
    rows.push(i);
  }
  return (
    <>
      {rows.map((row, index) => (
        <Grid item xs={6} key={"loader" + index}>
          <Card>
            <CardHeader
              avatar={
                <Badge>
                  <Avatar>
                    <Skeleton animation="wave" />
                  </Avatar>
                </Badge>
              }
              title={<Skeleton animation="wave" />}
              subheader={<Skeleton animation="wave" />}
            />
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Grid container spacing={0} alignItems="center">
                <Grid item sm={6}>
                  <Typography>
                    <Skeleton animation="wave" />
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
