import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { Route, Link, useNavigate } from "react-router-dom";
import { BiSearchAlt, BiCloudDownload } from "react-icons/bi";
import { FaRegKeyboard } from "react-icons/fa";
import "../App.css";
import twitterlogo from "../assets/twitter_logo.png";
import negativelogo from "../assets/negative_logo.png";
import neutrallogo from "../assets/neutral_logo.png";
import positivelogo from "../assets/positive_logo.png";
import CircularProgressBar from "../component/circularProgressBar";
import axios from "axios";

import { textTweets, userTweets } from "../API/user";
export default function Sentimental() {
  const path = window.location.pathname;
  let navigate = useNavigate();
  const [buttonDisplay, setbuttonDisplay] = useState("");
  const [inputDisplay, setinputDisplay] = useState("d-none");
  const [tableDisplay, settableDisplay] = useState("d-none");
  const [progressDisplay, setprogressDisplay] = useState("d-none");
  const [inputText, setInputText] = useState("");
  const [json, setJSON] = useState({
    "resultsall": [
      [
        "Taking a break from #60daysofdsa because of mid sems... Will continue soon...",
        {
          "bestresult": {
            "confidence": 99.98,
            "model": "CNN Model",
            "prediction": "Neutral"
          },
          "results": [
            {
              "confidence": 99.8,
              "model": "SNN Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.98,
              "model": "CNN Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.81,
              "model": "LSTM Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.82,
              "model": "BILSTM Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.83,
              "model": "Hybrid Model",
              "prediction": "Neutral"
            }
          ]
        }
      ],
      [
        "#60daysofdsa \nDay 8/60\nTheory day:\n- Introduction to stack data structures\n- Solved some time complexity problems",
        {
          "bestresult": {
            "confidence": 99.95,
            "model": "CNN Model",
            "prediction": "Neutral"
          },
          "results": [
            {
              "confidence": 99.89,
              "model": "SNN Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.95,
              "model": "CNN Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.81,
              "model": "LSTM Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.86,
              "model": "BILSTM Model",
              "prediction": "Neutral"
            },
            {
              "confidence": 99.86,
              "model": "Hybrid Model",
              "prediction": "Neutral"
            }
          ]
        }
      ]
    ]
  });

  const handleChange = ({ target }) => {
    let { value, name } = target;
    if (name === "inputText") setInputText(value);
  };

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
          {/* <img src={twitterlogo} alt="" /> */}
          <div className={`${progressDisplay} CPB1`}>
            <CircularProgressBar />1
            <CircularProgressBar />
            <CircularProgressBar />
          </div>
          <div className={`${progressDisplay} CPB2`}>
            <CircularProgressBar />
            <CircularProgressBar />
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
                  {json&&json.resultsall.map((item, i) => {
                    return (
                      <tr key ={i}>
                        <td>
                          {item[0]}
                        </td>
                        <td>{item[1].bestresult.prediction}</td>
                        <td>Value 3</td>
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
