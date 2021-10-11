import { useState } from 'react';

const Score = () => {
  const [score, setScore] = useState(0);

  const increaseScore = () => {
    setScore(score +1);
  }

  return (
    <h3 onClick={increaseScore}>Score: {score}</h3>
  )
}

export default Score;