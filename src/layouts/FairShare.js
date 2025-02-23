import React from "react";
import { Link } from "react-router-dom";
import "styles/FairShareLayout.css";

const FairShareLayout = ({children}) => {
    return (
        <div className="layout-container">
            <header>
                <h4>FairShare</h4>
                <nav>
                    <Link to="/cook">Cooking Tracker</Link>
                    <Link to="/split">Splitter</Link>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2025 FairShare</p>
            </footer>
        </div>
    )
}

export default FairShareLayout;