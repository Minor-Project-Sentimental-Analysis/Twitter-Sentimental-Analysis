import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Route, Link } from "react-router-dom";
import { BiSearchAlt, BiCloudDownload } from "react-icons/bi";
import { FaRegKeyboard } from "react-icons/fa";
import "../App.css";
import twitterlogo from "../assets/twitter_logo.png";
import negativelogo from "../assets/negative_logo.png";
import neutrallogo from "../assets/neutral_logo.png";
import positivelogo from "../assets/positive_logo.png";
import CircularProgressBar from "../component/circularProgressBar";
export default function Sentimental() {
  const [visible,setVisible]=useState(false);
  const [vis,setVis]=useState(true);
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
            <div className="option" value='1' onClick={()=>setVisible(true) }>
              <BiCloudDownload className="option_icon" />
              <h5>Import Tweets</h5>
            </div>
            <div className="option" value='1' onClick={()=>setVisible(true) }>
              <FaRegKeyboard color="#0018F9" className="option_icon" />
              <h5>Type Text</h5>
            </div>
          </div>
          { visible &&
          <div>
       <h3>Enter the tweet to be analysed</h3>
      <div className="inputBox">
        <input type="text" className="input_field"/>
        <BiSearchAlt className="search_icon"/>
      </div>
      </div>}
        </div>
        <div className="logo">
          <img src={twitterlogo} alt="" />
          {/* <div className="CPB1">
          <CircularProgressBar />
          <CircularProgressBar />
          <CircularProgressBar/>
          </div>
          <div className="CPB2">
          <CircularProgressBar/>
          <CircularProgressBar/>
          </div> */}
    {/* <div class="outer-wrapper">
    <div class="table-wrapper">
    <table>
        <thead>
            <th>TWEET</th>
            <th>SENTIMENT</th>
            <th>EMOTAG</th>
        </thead>
        <tbody>
            <tr>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolor necessitatibus, magnam, similique vel earum quas est eum labore dolorem facere quae asperiores laudantium ipsum exercitationem veniam, harum minus ab.</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
            <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
            </tr>
        </tbody>
    </table>
</div>
</div> */}
        </div>
      </div>
    </>
  );
}
