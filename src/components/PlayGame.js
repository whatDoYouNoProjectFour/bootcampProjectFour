import { Link } from 'react-router-dom';

const PlayGame = () => {
  return (
    <>
      <h2>Click to start!</h2>

      <Link to={"game"}>Start!</Link>
    </>
  )
}

export default PlayGame;