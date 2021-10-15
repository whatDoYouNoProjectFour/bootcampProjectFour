import { Link } from 'react-router-dom';

const PlayGame = () => {
  return (
    <>
      <h2 className="play">Click to start!</h2>
      <Link to={"game"} className="startButton">Start!</Link>
      <p className="welcome">Welcome to What Do You No! Match the correct homophone with the definition to score points. Submit your score to see how you stack up. Have fun!</p>
      <p> - Cal, Jun, Sara, and Seungmin</p>
    </>
  )
}

export default PlayGame;