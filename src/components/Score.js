import UserInfoForm from './UserInfoForm';

const Score = ({ round, score, }) => {

// component updates score if round is less than 10, and otherwise displays endgame message


  return (
    <>
      {round < 10 ? (
        <h2 className="score">Score: <span>{score}</span></h2>

      ) : (
        <div>
          <h2 className="score"> Score: <span>{score}</span></h2>
          <div className="outer animation">
            <div className="inner animation">
              <h3>Game Over</h3>
            </div>
          </div>

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