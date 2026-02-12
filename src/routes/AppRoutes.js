import { Outlet, useRoutes } from "react-router-dom";
import CookingTracker from "pages/CookingTracker";
import ReceiptEditor from "pages/splitly/ReceiptEditor";
import SplitlyRoutes from "./SplitlyRoutes";
import { Link } from "react-router-dom";
import "./FairShareLayout.scss";

function AppLayout() {
	return (
		<div className="layout-container">

			<header className="nav-header">
				<h4>FairShare</h4>
				<nav className="nav-links">
					<Link className="link-button" to="/splitly/">Splitly</Link>
					<Link className="link-button" to="/cook">Cooking Tracker</Link>
				</nav>
			</header>

			<div className="main-content">
				<Outlet />
			</div>

		</div>
	);
}

function AppRoutes() {

	return useRoutes([
		{
			element: <AppLayout />,
			children:
				[
					{ path: "splitly/*", element: <SplitlyRoutes /> },
					{ path: "cook", element: <CookingTracker /> },
				]
		}
	])
}

export default AppRoutes;
