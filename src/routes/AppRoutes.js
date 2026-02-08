import { useRoutes } from "react-router-dom";
import CookingTracker from "pages/CookingTracker";
import ReceiptEditor from "pages/splitly/ReceiptEditor";
import SplitlyRoutes from "./SplitlyRoutes";
import { Link } from "react-router-dom";
import "./FairShareLayout.scss";

function AppRoutes() {
	const page =
		(component) =>
			<div className="layout-container">
				<header className="nav-header">
					<h4>FairShare</h4>
					<nav className="nav-links">
						<Link className="link-button" to="/cook">Cooking Tracker</Link>
						<Link className="link-button" to="/split/">Splitter</Link>
					</nav>
				</header>
				<main className="main-content">{component}</main>
				<footer>Copyright</footer>
			</div>

	return useRoutes([
		{
			path: "/split/*",
			element: page(<SplitlyRoutes />)
		},
		{
			path: "/cook",
			element: page(<CookingTracker />)
		},
		{
			path: "*",
			element: page(<ReceiptEditor />)
		}
	])
}

export default AppRoutes;
