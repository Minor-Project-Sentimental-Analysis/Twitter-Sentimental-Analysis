import React from "react";
import Navbar from '../component/Navbar';
import {
    Route,
    Link,
  } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import '../App.css';
import twitterlogo from '../assets/twitter_logo.png'
import negativelogo from '../assets/negative_logo.png'
import neutrallogo from '../assets/neutral_logo.png'
import positivelogo from '../assets/positive_logo.png'

export default function Sentimental() {
  return (
    <>
      <Navbar />
      <div className="main_section">
      <div>
        <h1>Sentimental Analysis</h1>
        <h6>Categorises tweet under Positive, Neutral and Negative</h6>
        <div className="section" style={{width:"90%"}}>
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
      <h3>Enter the tweet to be analysed</h3>
      <div className="inputBox">
        <input type="text" className="input_field"/>
        <BiSearchAlt className="search_icon"/>
      </div>
      </div>
      <div className="logo">
        <img src={twitterlogo} alt="" />
      </div>
    </div>
    </>
  );
}
