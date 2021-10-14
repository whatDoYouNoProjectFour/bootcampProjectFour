function Leaderboard ({leaderboard}) {
    return (
        <div>
            <ul>

            {
                leaderboard.map(function(individualScore) {
                    console.log(individualScore);
                    return (
                        <li key={individualScore.key}>
                            <p className="userNameTag">{individualScore.userName}</p>
                            <p className="userScoreTag">{individualScore.userScore}</p>
                        </li>
                    )
                })
            }

            </ul>
        </div>
    )
}

export default Leaderboard;