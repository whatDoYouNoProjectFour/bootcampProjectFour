// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import database from '../firebase.js';
import { ref, remove } from 'firebase/database';

function Leaderboard ({leaderboard}) {

    const deleteComment = function(buttonToDeleteKey) {
        const specificNode = ref(database, buttonToDeleteKey);
    
        remove(specificNode);
    }

    return (
        <div>
            <ul className="userScoreList">
                <div className="ulHeadings">
                    <h4 className="playersHeading">Players</h4>
                    <h4 className="scoreHeading">Score</h4>
                    <h4 className="deleteHeading">Delete</h4>
                </div>

            {
                leaderboard.map(function(individualScore) {
                    return (
                        <li key={individualScore.key}>

                            <p className="userNameTag">{individualScore.userName}</p>

                            <p className="userScoreTag">{individualScore.userScore} Points</p>

                            <button
                            className="delete" 
                            onClick={() => deleteComment(individualScore.key)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                        </li>

                    )
                })
            }

            </ul>
        </div>
    )
}

export default Leaderboard;