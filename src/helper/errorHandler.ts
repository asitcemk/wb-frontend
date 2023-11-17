import { NavigateFunction } from "react-router-dom";

export const handleHTTPError = (error: any, navigate: NavigateFunction) => {
	switch (error.response?.status) {
		case 401:
			localStorage.removeItem("_admin_auth");
			return navigate('/admin');
		case 403:
			localStorage.removeItem("_admin_auth");
			return navigate('/admin');
		case 404:
			return navigate('/404');
		case 500:
			return navigate('/500');
		default:

	}
}