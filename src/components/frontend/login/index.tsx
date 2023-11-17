import React, { useState, forwardRef, useImperativeHandle } from "react";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import OTPForm from "./otp-form";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import ForgotPasswordForm from "./forgot-password-form";
import ResetPasswordForm from "./reset-password-form";

function FORM(props: any) {
  const { t } = useTranslation();
  const { showMessage, handleClose } = props;

  const [showLogin, setShowLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  const handleForgot = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgot(true);
    setShowOtp(false);
    setShowReset(false);
    setShowSignup(false);
  };
  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowLogin(true);
    setShowForgot(false);
    setShowOtp(false);
    setShowReset(false);
    setShowSignup(false);
  };
  const handleSignup = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowLogin(false);
    setShowForgot(false);
    setShowOtp(false);
    setShowReset(false);
    setShowSignup(true);
  };

  return (
    <React.Fragment>
      {showLogin ? (
        <LoginForm
          handleClose={handleClose}
          handleForgot={handleForgot}
          handleSignup={handleSignup}
          setShowLogin={setShowLogin}
          setShowOtp={setShowOtp}
          setToken={setToken}
        />
      ) : null}
      {showSignup ? (
        <SignupForm
          handleLogin={handleLogin}
          handleClose={handleClose}
          showMessage={showMessage}
          setShowSignup={setShowSignup}
          setShowOtp={setShowOtp}
          setToken={setToken}
          setSentEmail={setSentEmail}
          setType={setType}
        />
      ) : null}
      {showForgot ? (
        <ForgotPasswordForm
          showMessage={showMessage}
          handleClose={handleClose}
          handleLogin={handleLogin}
          setShowForgot={setShowForgot}
          setShowOtp={setShowOtp}
          setToken={setToken}
          setSentEmail={setSentEmail}
          setType={setType}
        />
      ) : null}
      {showOtp ? (
        <OTPForm
          showMessage={showMessage}
          handleClose={handleClose}
          type={type}
          token={token}
          setShowOtp={setShowOtp}
          setShowReset={setShowReset}
          sentEmail={sentEmail}
          handleForgot={handleForgot}
        />
      ) : null}
      {showReset ? (
        <ResetPasswordForm
          showMessage={showMessage}
          handleLogin={handleLogin}
          token={token}
          setShowReset={setShowReset}
          setShowLogin={setShowLogin}
          setToken={setToken}
        />
      ) : null}
    </React.Fragment>
  );
}

const Login = forwardRef((props: any, ref) => {
  const { showMessage } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="login-dialog-title"
      scroll="body"
    >
      <FORM handleClose={handleClose} showMessage={showMessage} />
    </Dialog>
  );
});

const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(
  Login
);
