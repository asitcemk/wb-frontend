import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { InjectedFormProps } from "redux-form";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginForm from "./login-form";
import ForgotPasswordForm from "./forgot-password-form";
import VerifyOTPForm from "./verify-otp-form";
import ResetPasswordForm from "./reset-password-form";

interface AdminLoginProps extends InjectedFormProps {}

const AdminLogin = (props: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showForgot, setShowForgot] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showReset, setShowReset] = useState<boolean>(false);
  const [sentEmail, setSentEmail] = useState("");
  const [token, setToken] = useState("");

  const checkIsLogged = () => {
    if (localStorage.getItem("_admin_auth")) {
      const redirectUrl =
        localStorage.getItem("_return_url") ?? "/admin/dashboard";
      return navigate(redirectUrl);
    }
  };

  useEffect(() => {
    checkIsLogged();
  }, []);

  const handleForgot = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgot(true);
    setShowOtp(false);
    setShowReset(false);
  };

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowLogin(true);
    setShowForgot(false);
    setShowOtp(false);
    setShowReset(false);
  };

  return (
    <Container maxWidth="xl">
      <Grid container item justifyContent="center" alignItems="center">
        <Card sx={{ minWidth: 275, width: 400, marginTop: 20 }}>
          <CardContent>
            {showLogin ? <LoginForm handleForgot={handleForgot} /> : null}
            {showForgot ? (
              <ForgotPasswordForm
                handleLogin={handleLogin}
                setShowForgot={setShowForgot}
                setShowOtp={setShowOtp}
                setToken={setToken}
                setSentEmail={setSentEmail}
              />
            ) : null}
            {showOtp ? (
              <VerifyOTPForm
                token={token}
                sentEmail={sentEmail}
                setShowReset={setShowReset}
                setShowOtp={setShowOtp}
                handleForgot={handleForgot}
              />
            ) : null}
            {showReset ? (
              <ResetPasswordForm
                token={token}
                setShowReset={setShowReset}
                setShowLogin={setShowLogin}
                setToken={setToken}
                handleLogin={handleLogin}
              />
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default AdminLogin;
