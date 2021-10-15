import UserInfoForm from './UserInfoForm';

const Score = ({ round, score, }) => {



  return (
    <>
      {round < 10 ? (
        <h2>Score: <span className="score">{score}</span></h2>

      ) : (
        <div>
          <h2>Score: <span className="score">{score}</span></h2>
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