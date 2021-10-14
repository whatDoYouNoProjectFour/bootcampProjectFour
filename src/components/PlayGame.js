
const PlayGame = ({ setStartGame }) => {

    return (
        <>
            <h2>Click to start!</h2>
            <button onClick={() => setStartGame(true)}>Start!</button>
        </>
    )
}

export default PlayGame;