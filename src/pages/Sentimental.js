import React from "react";
import Navbar from "../component/Navbar";
import { Route, Link } from "react-router-dom";
import { BiSearchAlt, BiCloudDownload } from "react-icons/bi";
import { FaRegKeyboard } from "react-icons/fa";
import "../App.css";
import twitterlogo from "../assets/twitter_logo.png";
import negativelogo from "../assets/negative_logo.png";
import neutrallogo from "../assets/neutral_logo.png";
import positivelogo from "../assets/positive_logo.png";
import Table from "../component/Table";
export default function Sentimental() {
  return (
    <>
      <Navbar />
      <div className="main_section">
        <div>
          <h1>Sentimental Analysis</h1>
          <h6>Categorises tweet under Positive, Neutral and Negative</h6>
          <div className="section" style={{ width: "90%" }}>
            <div>
              <img className="emoticon" src={positivelogo} alt="" />
            </div>
            <div>
              <img className="emoticon" src={neutrallogo} alt="" />
            </div>
            <div>
              <img className="emoticon" src={negativelogo} alt="" />
            </div>
          </div>
          <br />
          <div
            className="section"
            style={{ width: "90%", justifyContent: "space-around" }}
          >
            <div className="option">
              <BiCloudDownload className="option_icon" />
              <h5>Import Tweets</h5>
            </div>
            <div className="option">
              <FaRegKeyboard color="#0018F9" className="option_icon" />
              <h5>Type Text</h5>
            </div>
          </div>
          <h3>Enter the tweet to be analysed</h3>
      <div className="inputBox">
        <input type="text" className="input_field"/>
        <BiSearchAlt className="search_icon"/>
      </div>
        </div>
        <div className="logo">
          {/* <img src={twitterlogo} alt="" /> */}
         <Table/>
        </div>
      </div>
    </>
  );
}