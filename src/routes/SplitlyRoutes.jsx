import { Outlet, useRoutes } from "react-router-dom";
import { ReceiptGallery } from "pages/splitly/ReceiptGallery";
import { Users } from "pages/splitly/Users";
import { Activity } from "pages/splitly/Activity";
import { Settings } from "pages/splitly/Settings";
import { Link } from "react-router-dom";
import "./Splitly.scss";
import ReceiptEditor from "pages/splitly/ReceiptEditor";

function SplitlyLayout() {
	return (
		<div className="splitly-container">

			<aside className="splitly-nav-container">
				<Link className="nav-item" to="/splitly/receipts">Receipts</Link>
				<Link className="nav-item" to="/splitly/users">Users</Link>
				<Link className="nav-item" to="/splitly/activity">Activity</Link>
				<Link className="nav-item" to="/splitly/settings">Settings</Link>
			</aside>

			<main className="splitly-content">
				<Outlet />
			</main>

		</div>
	)
}

function SplitlyRoutes() {

	return useRoutes([
		{
			element: <SplitlyLayout />,
			children: [
				{ index: true, element: <ReceiptEditor /> },
				{ path: "receipts", element: <ReceiptGallery /> },
				{ path: "users", element: <Users /> },
				{ path: "activity", element: <Activity /> },
				{ path: "settings", element: <Settings /> },
			]
		}
	])
}

export default SplitlyRoutes;
