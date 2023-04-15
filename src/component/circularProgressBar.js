import React, { useEffect, useState } from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar(props) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 60) {

        setPercentage(percentage + 1);
      }
    }, 10);
  }, [percentage]);
    const {cbcolor} = props;
  return (
    <div>
      {/* <h4>Circular progress bar in React </h4> */}
      <div style={{width: 180,padding:10}}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={{path: { stroke: `rgba(1, 152, 199, ${percentage / 100})`}}}/>
      </div>
    </div>
  );
}

export default CircularProgressBar;