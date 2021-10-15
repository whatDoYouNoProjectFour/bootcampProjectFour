import { Link } from 'react-router-dom';

const PlayGame = ({ setStartGame, setRound, round }) => {
  const startNewGame = () => {
    setStartGame(true);
  }
  return (
    <>
      <h2>Click to start!</h2>

      <Link to={"game"}>Start!</Link>
    </>
  )
}

export default PlayGame;