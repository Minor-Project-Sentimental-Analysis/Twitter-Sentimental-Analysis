import React from "react";
import negativelogo from "../assets/negative_logo.png";
import neutrallogo from "../assets/neutral_logo.png";
import positivelogo from "../assets/positive_logo.png";
import Progressbar from "./Progressbar";
import { buildStyles } from "react-circular-progressbar";
export default function progresscard(props) {
  const { name, percent, prediction,width,height, imgw,imgh} = props;
  function emoticon(prediction) {
    if (prediction === "Positive") {
      return positivelogo;
    }
    if (prediction === "Neutral") {
      return neutrallogo;
    }
    if (prediction === "Negative") {
      return negativelogo;
    }
  }
  return (
    <>
     <div style={{width: `${width}vw`, height: `${height}vh`}} className="progress glass">
        <div className="progressemitcon">
          <img
            className="baremoticon glow"
            src={emoticon(prediction)}
            alt=""
            height={imgh}
            width={imgw} 
          />
        </div>
        <div className="lprogressbar">
          <h3>{name}</h3>
          <Progressbar 
            style={{ border: "1px solid white" }}
            percent={percent}
          />
          <div className="textbar">
            <h7>{prediction}</h7>
            <h7>{percent} %</h7>
          </div>
        </div>
      </div>
    </>
  );
}
