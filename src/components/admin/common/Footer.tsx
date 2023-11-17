import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Footer = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/admin">
        Wowbridge
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};

export default Footer;
