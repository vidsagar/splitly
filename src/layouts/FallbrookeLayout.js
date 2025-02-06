import React from "react";
import { Link } from "react-router-dom";
import "styles/FallbrookeLayout.css";

const FallbrookeLayout = ({children}) => {
    return (
        <div className="layout-container">
            <header>
                <h2>Fallbrooke</h2>
                <nav>
                    <Link to="/cooking">Cooking</Link>
                    <Link to="/split">Splitting</Link>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2025 Fallbrooke</p>
            </footer>
        </div>
    )
}

export default FallbrookeLayout;