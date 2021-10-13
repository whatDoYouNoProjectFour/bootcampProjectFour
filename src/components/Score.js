
const Score = (props) => {
  return (
    <>
      {/* display scroe until round 10 */}
      {props.round < 10 ? (
        <h3>Score: {props.score}</h3>

      ) : (
        <div>
          <h2>Score: {props.score}</h2>
          <h3> Game End</h3>
        </div>
      )}
    </>

  )
}

export default Score;