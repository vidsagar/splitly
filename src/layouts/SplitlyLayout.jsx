import React from "react";
import { Link } from "react-router-dom";
import "styles/FairShareLayout.scss";

const SplitlyLayout = ({ children }) => {
	return (
		<div className="layout-container">
			<nav>
				<Link to="/">Receipts</Link>
			</nav>
			<main>{children}</main>
		</div>
	)
}

export default SplitlyLayout;
