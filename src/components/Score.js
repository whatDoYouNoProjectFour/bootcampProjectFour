import UserInfoForm from './UserInfoForm';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Score = ({ round, score, setStartGame, setRound }) => {
  // console.log(props);
  const startNewGame = () => {
    setStartGame(false);
    setRound(0);
  }
  return (
    <>
      {/* display scroe until round 10 */}
      {round < 10 ? (
        <h3>Score: {score}</h3>
      ) : (
        <div>
          <h3>Score: {score}</h3>
          <h4> Game End</h4>


          <button onClick={startNewGame}>Start New Game</button>
 
          
          <UserInfoForm
            endRound={round}
            finalScore={score}
          />
        </div>
      )}


    </>

  )
}

export default Score;