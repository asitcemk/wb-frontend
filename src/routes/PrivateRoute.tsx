import { Navigate } from "react-router-dom";
import Layout from "./../components/frontend/common/Layout";

export const PrivateRoute = ({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}): JSX.Element => {
  const isLogin = localStorage.getItem("_auth");
  if (!isLogin) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <Layout>{children}</Layout>;
};
