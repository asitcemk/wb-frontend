import LinearProgress from "@mui/material/LinearProgress";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { route_url_pages } from "./presets";
import { AdminRoute } from "./AdminRoute";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AdminLoginRoute } from "./AdminLoginRoute";

//404 page
const A404Component = lazy(() => import("./../components/ErrorPages/page-404"));
//500 page
const A500Component = lazy(() => import("./../components/ErrorPages/page-500"));
//frontend
const Home = lazy(() => import("./../components/frontend/home"));
const MyAccount = lazy(() => import("./../components/frontend/my-account"));
const Registration = lazy(
  () => import("./../components/frontend/registration/registration")
);
const OtpVerification = lazy(
  () => import("./../components/frontend/registration/otp-verification")
);
//end frontend
//admin
const AdminLogin = lazy(() => import("./../components/admin/login"));
const Dashboard = lazy(() => import("./../components/admin/dashboard"));
const Internationalization = lazy(
  () => import("./../components/admin/internationalization")
);
const InternationalizationUpdate = lazy(
  () => import("./../components/admin/internationalization/update")
);
const Columns = lazy(() => import("./../components/admin/columns"));
const CreateColumns = lazy(
  () => import("./../components/admin/columns/create")
);
const ColumnsUpdate = lazy(
  () => import("./../components/admin/columns/update")
);
const Users = lazy(() => import("./../components/admin/users"));
const CreateUser = lazy(() => import("./../components/admin/users/create"));
const UpdateUser = lazy(() => import("./../components/admin/users/update"));
//end admin

const routes = (
  <Suspense fallback={<LinearProgress />}>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={route_url_pages.landing_page} element={<Home />} />
        <Route
          path={route_url_pages.registration_page}
          element={<Registration />}
        />
        <Route
          path={route_url_pages.otp_verification_page}
          element={<OtpVerification />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={route_url_pages.account_page} element={<MyAccount />} />
      </Route>
      <Route element={<AdminLoginRoute />}>
        <Route path="/admin" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/internationalization"
          element={<Internationalization />}
        />
        <Route
          path="/admin/internationalization/update/:internationalizationId"
          element={<InternationalizationUpdate />}
        />
        <Route path="/admin/columns/create" element={<CreateColumns />} />
        <Route path="/admin/columns/update/:Id" element={<ColumnsUpdate />} />
        <Route path="/admin/columns" element={<Columns />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/create" element={<CreateUser />} />
        <Route path="/admin/users/update/:Id" element={<UpdateUser />} />
      </Route>

      <Route path="/500" element={<A500Component />} />

      <Route path="*" element={<A404Component />} />
    </Routes>
  </Suspense>
);

export default function RouteComponents() {
  return <BrowserRouter>{routes}</BrowserRouter>;
}
