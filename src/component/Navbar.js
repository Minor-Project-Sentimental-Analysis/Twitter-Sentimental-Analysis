import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="Navbar">
      <div>
        <a href="/home" className="navlink">
         Home
        </a>
      </div>
      <div>
        <a href="/SentimentAnalysis" className="navlink">
          Sentiment Analysis
        </a>
      </div>
    </div>
  );
}
