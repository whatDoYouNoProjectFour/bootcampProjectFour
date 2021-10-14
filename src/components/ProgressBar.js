import { Line } from 'rc-progress';

const ProgressBar = ({progress}) => (
  <div className="wrapper">
     <Line percent={progress} strokeWidth="1" trailWidth="5" strokeColor="#6056f9" strokeLinecap='square'/>
  </div>
);

export default ProgressBar;