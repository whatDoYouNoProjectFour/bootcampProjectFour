import UserInfoForm from './UserInfoForm';
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
          <h2>Score: {score}</h2>
          <h3> Game End</h3>
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