import { Navigate } from "react-router-dom";
import Layout from "./../components/admin/common/Layout";

export const AdminRoute = ({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}): JSX.Element => {
  const isLogin = localStorage.getItem("_admin_auth");
  if (!isLogin) {
    // user is not authenticated
    return <Navigate to="/admin" />;
  }
  return <Layout>{children}</Layout>;
};
