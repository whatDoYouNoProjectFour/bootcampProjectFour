import { Link } from 'react-router-dom';

const PlayGame = ({ setStartGame, setRound, round }) => {
    const startNewGame = () => {
        console.log(round);
        setStartGame(true);
    }
    return (
        <>
            <h2>Click to start!</h2>
            {/* <button onClick={startNewGame}>Start!</button> */}
            <Link path="/maingame">Start!</Link>
        </>
    )
}

export default PlayGame;