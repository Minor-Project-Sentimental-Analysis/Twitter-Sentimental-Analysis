import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate(props) {
  const {percent} = props;  
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === percent) {
          return percent;
        }
        const diff = 2;
        return Math.min(oldProgress + diff, percent);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}