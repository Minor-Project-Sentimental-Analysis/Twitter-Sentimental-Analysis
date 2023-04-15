import React, { useEffect, useState } from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 60) {

        setPercentage(percentage + 1);
      }
    }, 10);
  }, [percentage]);
function CircularProgressBar(props){
    const {cbcolor} = props;
  return (
    <div>
      {/* <h4>Circular progress bar in React </h4> */}
      <div style={{width: 180,padding:20}}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({ pathColor: {cbcolor}})}/>
      </div>
    </div>
  );
}
}
export default CircularProgressBar;