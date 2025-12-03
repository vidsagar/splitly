import React from "react";
import { Link } from "react-router-dom";
import "styles/FairShareLayout.scss";

const FairShareLayout = ({ children }) => {
	return (
		<div className="layout-container">
			<header className="nav-header">
				<h4>FairShare</h4>
				<nav className="nav-links">
					<Link className="link-button" to="/cook">Cooking Tracker</Link>
					<Link className="link-button" to="/split">Splitter</Link>
				</nav>
			</header>
			<main className="main-content">{children}</main>
			<footer>Copyright</footer>
		</div>
	)
}

export default FairShareLayout;
