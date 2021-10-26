import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavBar = () => 
    {
        setOpenLinks(!openLinks);
    };

    return (
        <div className="navbar">
            <div className = "left" id={openLinks ? "open" : "close"}>
                <h1>
                     <Link to="/"> Tiger Tchakounté </Link>
                </h1>
                <div className = "hiddenLink">
                  <Link to="/"> Home </Link>
                  <Link to="/music"> Music </Link>
                  <Link to="/about"> About </Link>
                  <Link to="/contact"> Contact </Link>
                </div>
            </div>
            <div className = "right">
                <Link to="/"> Home </Link>
                <Link to="/music"> Music </Link>
                <Link to="/about"> About </Link>
                <Link to="/contact"> Contact </Link>
                <button onClick = {toggleNavBar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
