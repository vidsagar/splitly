import { useRoutes } from "react-router-dom";
import { Receipts } from "pages/splitly/Receipts";
import { Users } from "pages/splitly/Users";
import { Activity } from "pages/splitly/Activity";
import { Settings } from "pages/splitly/Settings";
import { Link } from "react-router-dom";
import "./Splitly.scss";

function SplitlyRoutes() {
	const page = (component) =>
		<div className="splitly-container">
			<main className="splitly-content">{component}</main>
			<nav className="splitly-nav-container">
				<Link className="nav-item" to="/split/receipts">Receipts</Link>
				<Link className="nav-item" to="/split/users">Users</Link>
				<Link className="nav-item" to="/split/activity">Activity</Link>
				<Link className="nav-item" to="/split/settings">Settings</Link>
			</nav>
		</div>

	return useRoutes([
		{
			path: "receipts",
			element: page(<Receipts />)
		},
		{
			path: "users",
			element: page(<Users />)
		},
		{
			path: "activity",
			element: page(<Activity />)
		},
		{
			path: "settings",
			element: page(<Settings />)
		},
		{
			path: "",
			element: page(<Receipts />)
		}
	])
}

export default SplitlyRoutes;
