import React from "react";
import positivelogo from "../assets/positive_logo.png"
import Progressbar from "./Progressbar"
export default function progresscard() {
    return(
        <>
         <div className="progress">
             <div className="progressemitcon">
             <img className="baremoticon" src={positivelogo} alt="" height={65} width={65}/>
             </div>
             <div className="lprogressbar">
                  <h3>SNN</h3>
                  <Progressbar percent={50}/>
                  <div className="textbar">
                    <h7>POSITIVE</h7>
                    <h7>100%</h7>
                  </div>
             </div>
         </div>
        </>
    )
}