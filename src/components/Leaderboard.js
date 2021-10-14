function Leaderboard ({leaderboard}) {
    return (
        <div>
            <ul className="userScoreList">
                <div className="ulHeadings">
                    <h4>Players</h4>
                    <h4>Score</h4>
                </div>

            {
                leaderboard.map(function(individualScore) {
                    console.log(individualScore);
                    return (
                        <li key={individualScore.key}>
                            <p className="userNameTag">{individualScore.userName}</p>
                            <p className="userScoreTag">{individualScore.userScore} Points</p>
                        </li>
                    )
                })
            }

            </ul>
        </div>
    )
}

export default Leaderboard;