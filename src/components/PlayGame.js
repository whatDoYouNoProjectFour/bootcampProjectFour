import { Link } from 'react-router-dom';

const PlayGame = () => {
  return (
    <>
      <h2 className="play">Welcome to What Do You No?</h2>
      
      <p className="welcome"> Match the correct homophone with the definition to score points. Submit your score to see how you stack up. Have fun!</p>
      <p className="signature"> - Cal, Jun, Sara, and Seungmin</p>
      <Link to={"game"} className="startButton">Click to Start!</Link>
    </>
  )
}

export default PlayGame;