import { Line } from 'rc-progress';

// progress bar updates when progress state changes

const ProgressBar = ({ progress }) => (
  <>
    <Line percent={progress} strokeWidth="3" trailWidth="3" strokeColor="#6056f9" strokeLinecap='square' />
  </>
);

export default ProgressBar;