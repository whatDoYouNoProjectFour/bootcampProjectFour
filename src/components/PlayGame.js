import { Link } from 'react-router-dom';

const PlayGame = ({ setStartGame, setRound, round }) => {
  const startNewGame = () => {
    setStartGame(true);
  }
  return (
    <Router>

    <Route>
      <h2>Click to start!</h2>

      <Link to={"/"}>Start!</Link>
    <Route/>
    </Router>
  )
}

export default PlayGame;