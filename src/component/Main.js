import React from "react";
import '../App.css';
import twitterlogo from '../assets/twitter_logo.png'

export default function Main() {
  return (
    <div className="main_section">
      <div>
        <h1>Welcome to the world of Tweets</h1>
        <h6>Tweets Sentiment Analysis</h6>
        <div className="section">
          <div>
            <h3>350632</h3>
            <p>Tweets sent per minute</p>
          </div>
          <div>
            <h3>321056231</h3>
            <p>Total Number of monthly active users on Twitter</p>
          </div>
          <div>
            <h3>7447680</h3>
            <p>Minutes Since First Tweet Ever</p>
          </div>
        </div>
        <br />
      <h2>Perform Sentiment Analysis on Tweets</h2>
      </div>
      <div>
        <img src={twitterlogo} alt="" />
      </div>
    </div>
  );
}
