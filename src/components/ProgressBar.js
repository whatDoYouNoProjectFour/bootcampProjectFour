import { Line } from 'rc-progress';

const ProgressBar = ({progress}) => (
  <>
     <Line percent={progress} strokeWidth="3" trailWidth="3" strokeColor="#6056f9" strokeLinecap='square'/>
  </>
);

export default ProgressBar;