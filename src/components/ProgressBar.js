import { Line } from 'rc-progress';

const ProgressBar = ({progress}) => (
  <>
     <Line percent={progress} strokeWidth="1" trailWidth="5" strokeColor="#6056f9" strokeLinecap='square'/>
  </>
);

export default ProgressBar;