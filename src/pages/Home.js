import React from 'react'
import { Link } from "react-router-dom";
import backImage from "../assets/bg1.JPG"
import "../styles/Home.css";

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${backImage})` }}> 
          <div className="headerContent"> 
          </div>
        </div>
    )
}

export default Home;
