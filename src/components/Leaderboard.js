import database from '../firebase.js'
import { useEffect, useState } from 'react';
import { onValue, ref, push } from 'firebase/database';

function Leaderboard(props) {
    console.log(props);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userName, setUserName] = useState('');
    const [finalScore, setFinalScore] = useState();

    useEffect(function() {

        const dbRef = ref(database);

        onValue(dbRef, function(databaseShot) {
            // console.log(databaseShot.val());

            const data = databaseShot.val();

            const leaderboardArray = [];

            for (let property in data) {
                const userInfoObject = {
                    key: property,
                    userName: data[property].username,
                    userScore: data[property].score
                }
                leaderboardArray.push(userInfoObject);
            }
            setLeaderboard(leaderboardArray);
        })
    }, []);

    const userNameChange = function(event) {
        setUserName(event.target.value);
    }

    // const userScoreChange = function() {
    //     setFinalScore(props.finalScore)
    //     console.log(finalScore);
    // }

    const submitHandle = function(event) {
        event.preventDefault();

        if (userName ) {
            const dbRef = ref(database);

            const userNameAndScore = {
                score: finalScore,
                username: userName
            }

            push(dbRef, userNameAndScore);
        
        }
        else {
            console.log(`Please finish`);
        }
    }
    
    return (

        <div>
            <form>
            <label htmlFor="userName">Type your name</label>
            <input type="text" 
            id="userName" 
            onChange={userNameChange}
            value={userName}
            />

            <p>Your final score: {props.finalScore}</p>

            <button type="submit"
            onClick={submitHandle}>
                Get your score on the board!
            </button>
            </form>
        </div>
    )
}

export default Leaderboard;