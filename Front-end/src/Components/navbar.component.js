import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    
    return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            {/* This navbar based off the bootstrap navbar */}
        <Link to="/" className="navbar-brand">GenericReactApp</Link>
        <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {/* creates the two items in the navbar for navigation */}
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Gerneric List</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Generic</Link>
                    </li>
                    
            </ul>
        </div>
    </nav>);
};

export default NavBar
