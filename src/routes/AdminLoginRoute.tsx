import LayoutLogin from "./../components/admin/common/LayoutLogin";

export const AdminLoginRoute = ({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}): JSX.Element => {
  return <LayoutLogin>{children}</LayoutLogin>;
};
