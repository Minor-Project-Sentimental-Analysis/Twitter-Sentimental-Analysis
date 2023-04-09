import React from "react";
import Navbar from '../component/Navbar';
import {
    Route,
    Link,
  } from "react-router-dom";
import '../App.css';
import twitterlogo from '../assets/twitter_logo.png'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main_section">
      <div>
        <h1>Welcome to the world of Tweets</h1>
        <h6>Tweets Sentiment Analysis</h6>
        <div className="section">
          <div>
            <h3>350632</h3>
            <h6>Tweets sent per minute</h6>
          </div>
          <div>
            <h3>321056231</h3>
            <h6>Total Number of monthly active users on Twitter</h6>
          </div>
          <div>
            <h3>7447680</h3>
            <h6>Minutes Since First Tweet Ever</h6>
          </div>
        </div>
        <br />
      <h2>Perform Sentiment Analysis on Tweets</h2>
      </div>
      <div className="logo">
        <img src={twitterlogo} alt="" />
      </div>
    </div>
    </>
  );
}
