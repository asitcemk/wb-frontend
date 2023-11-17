import Layout from "./../components/frontend/common/Layout";

export const PublicRoute = ({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}): JSX.Element => {
  return <Layout>{children}</Layout>;
};
