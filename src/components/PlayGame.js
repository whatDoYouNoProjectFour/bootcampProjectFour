
const PlayGame = ({ setStartGame, setRound, round }) => {
    const startNewGame = () => {
        console.log(round);
        setStartGame(true);
    }
    return (
        <>
            <h2>Click to start!</h2>
            <button onClick={startNewGame}>Start!</button>
        </>
    )
}

export default PlayGame;