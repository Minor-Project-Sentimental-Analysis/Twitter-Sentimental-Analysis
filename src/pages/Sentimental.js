import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { Route, Link, useNavigate } from "react-router-dom";
import { BiSearchAlt, BiCloudDownload } from "react-icons/bi";
import { FaRegKeyboard } from "react-icons/fa";
import "../App.css";
import twitterlogo from "../assets/twitter_logo.png";
import negativelogo from "../assets/negative_logo.png";
import neutrallogo from "../assets/neutral_logo.png";
import positivelogo from "../assets/positive_logo.png";
import Progresscard from "../component/Progresscard";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { textTweets, userTweets } from "../API/user";

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

export default function Sentimental() {
  const path = window.location.pathname;
  let navigate = useNavigate();
  const [buttonDisplay, setbuttonDisplay] = useState("");
  const [inputDisplay, setinputDisplay] = useState("d-none");
  const [tableDisplay, settableDisplay] = useState("d-none");
  const [progressDisplay, setprogressDisplay] = useState("d-none");
  const [inputText, setInputText] = useState("");

  const [json, setJSON] = useState({});
  useEffect(() => {}, [json]);
  const handleChange = ({ target }) => {
    let { value, name } = target;
    if (name === "inputText") setInputText(value);
  };
  // console.log(json);
  const handleSubmit = async () => {
    setinputDisplay("d-none");
    try {
      let response;
      if (path === "/SentimentAnalysis/text") {
        setprogressDisplay("");
        response = await textTweets(inputText);
      } else {
        settableDisplay("");
        response = await userTweets(inputText);
      }
      console.log(response);
      if (response) {
        setJSON(response.data);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="main_section">
        <div>
          <h1>Sentimental Analysis</h1>
          {Object.keys(json).length === 0 && (
            <h6 style={{ marginTop: "-40px", marginLeft: "9px" }}>
              Categorises tweet under Positive, Neutral and Negative
            </h6>
          )}
          {Object.keys(json).length === 0 && (
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
          )}
          {json && json.bestresult && (
            <div className="bestResult" style={{ width: "90%" }}>
              <h4 style={{ color: "coral" }}>Statement</h4>
              <p>{inputText}</p>
              <Progresscard
                width={40}
                height={26}
                imgw={100}
                imgh={100}
                name={json.bestresult.model}
                percent={json.bestresult.confidence}
                prediction={json.bestresult.prediction}
              />
            </div>
          )}
          {json && json.overall && (
            <div className="overallResult" style={{ width: "90%" }}>
              <h4 style={{ color: "coral" }}>Username</h4>
              <p>@{inputText}</p>
              <div className="section" style={{ width: "90%" }}>
                <div>
                  <CircularProgressbarWithChildren
                    value={json.overall.positive}
                    styles={buildStyles({
                      textColor: "white",
                      pathColor: "green",
                      trailColor: "rgb(144,238,144)",
                    })}
                  >
                    <img
                      style={{ width: 50, marginTop: -5 }}
                      src={positivelogo}
                      alt="-ve"
                    />
                    <div style={{ fontSize: 20 }}>
                      <strong>{json.overall.positive}%</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <div>
                  <CircularProgressbarWithChildren
                    value={json.overall.neutral}
                    styles={buildStyles({
                      textColor: "white",
                      pathColor: "yellow",
                      trailColor: "rgb(189,183,107)",
                    })}
                  >
                    <img
                      style={{ width: 50, marginTop: -5 }}
                      src={neutrallogo}
                      alt="-ve"
                    />
                    <div style={{ fontSize: 20 }}>
                      <strong>{json.overall.neutral}%</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <div>
                  <CircularProgressbarWithChildren
                    value={json.overall.negative}
                    // text={`${json.overall.negative}%`}
                    styles={buildStyles({
                      textColor: "white",
                      pathColor: "rgb(255,0,0)",
                      trailColor: "rgb(240,128,128)",
                    })}
                  >
                    <img
                      style={{ width: 50, marginTop: -5 }}
                      src={negativelogo}
                      alt="-ve"
                    />
                    <div style={{ fontSize: 20 }}>
                      <strong>{json.overall.negative}%</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
            </div>
          )}
          {/* <br /> */}
          <div
            className={`section ${buttonDisplay}`}
            style={{ width: "90%", justifyContent: "space-around" }}
          >
            <div
              className="option"
              value="1"
              onClick={() => {
                setbuttonDisplay("d-none");
                setinputDisplay("");
                navigate("/SentimentAnalysis/usertweet");
              }}
            >
              <BiCloudDownload className="option_icon" />
              <h5>Import Tweets</h5>
            </div>
            <div
              className="option"
              value="1"
              onClick={() => {
                setbuttonDisplay("d-none");
                setinputDisplay("");
                navigate("/SentimentAnalysis/text");
              }}
            >
              <FaRegKeyboard color="#0018F9" className="option_icon" />
              <h5>Type Text</h5>
            </div>
          </div>

          <div className={`${inputDisplay}`}>
            <h3>
              {path === "/SentimentAnalysis/text"
                ? "Enter the tweet to be analysed"
                : "Enter User name"}
            </h3>
            <div className="inputBox">
              <input
                type="text"
                className="input_field"
                name="inputText"
                onChange={handleChange}
                value={inputText}
              />
              <BiSearchAlt className="search_icon" onClick={handleSubmit} />
            </div>
          </div>
        </div>
        <div className="logo">
          <img
            className={
              tableDisplay === "" || progressDisplay === "" ? "d-none" : ""
            }
            src={twitterlogo}
            alt=""
          />
          <div className={`CPB ${progressDisplay}`}>
            {json &&
              json.results &&
              json.results.map((item, i) => {
                return (
                  <Progresscard
                    width={20}
                    height={13}
                    imgw={65}
                    imgh={65}
                    key={i}
                    name={item.model}
                    percent={item.confidence}
                    prediction={item.prediction}
                  />
                );
              })}
          </div>
          <div class={`outer-wrapper ${tableDisplay}`}>
            <div class="table-wrapper">
              <table>
                <thead>
                  <th>TWEET</th>
                  <th>SENTIMENT</th>
                  <th>EMOTAG</th>
                </thead>
                <tbody>
                  {Object.keys(json).length === 0 && (
                    <tr>
                      <td style={{width:"500px"}}>Loading....</td>
                      <td>Loading....</td>
                      <td>Loading....</td>
                    </tr>
                  )}
                  {Object.keys(json).length === 0 && (
                    <tr>
                      <td>Loading....</td>
                      <td>Loading....</td>
                      <td>Loading....</td>
                    </tr>
                  )}
                  {Object.keys(json).length === 0 && (
                    <tr>
                      <td>Loading....</td>
                      <td>Loading....</td>
                      <td>Loading....</td>
                    </tr>
                  )}
                  {Object.keys(json).length === 0 && (
                    <tr>
                      <td>Loading....</td>
                      <td>Loading....</td>
                      <td>Loading....</td>
                    </tr>
                  )}
                  {Object.keys(json).length === 0 && (
                    <tr>
                      <td>Loading....</td>
                      <td>Loading....</td>
                      <td>Loading....</td>
                    </tr>
                  )}
                  {json &&
                    json.resultsall &&
                    json.resultsall.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item[0]}</td>
                          <td>{item[1].bestresult.prediction}</td>
                          <td>
                            <img
                              src={emoticon(item[1].bestresult.prediction)}
                              alt=""
                              height={40}
                              width={40}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
