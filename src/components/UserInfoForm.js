import database from '../firebase.js'
import { useEffect, useState } from 'react';
import { onValue, ref, push } from 'firebase/database';
import Leaderboard from './Leaderboard.js';

function UserInfoForm({finalScore}) {
    const [leaderboard, setLeaderboard] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(function() {

        const dbRef = ref(database);

        onValue(dbRef, function(databaseShot) {

            const data = databaseShot.val();

            const leaderboardArray = [];

            for (let property in data) {
                const userInfoObject = {
                    key: property,
                    userName: data[property].username,
                    userScore: data[property].score
                }

                leaderboardArray.unshift(userInfoObject);
            }
            setLeaderboard(leaderboardArray);
        })
    }, []);

    const userNameChange = function(event) {
        setUserName(event.target.value);
    }

    const submitHandle = function(event) {
        if (userName && finalScore) {
            const dbRef = ref(database);

            const userNameAndScore = {
                score: finalScore,
                username: userName
            }

            push(dbRef, userNameAndScore);

            setUserName('');
        }
        else {
            console.log(`Please finish`);
        }
    }
    
    return (
        <div className="wrapper">
            <form>
            <label htmlFor="userName">Type your name</label>
            <input type="text" 
              id="userName" 
              onChange={userNameChange}
              value={userName}
              required
            />

            <p>Your final score: {finalScore}</p>

            <button type="submit"
            onClick={submitHandle}>
                Submit your name and play again!
            </button>
            </form>

            <Leaderboard 
            leaderboard={leaderboard}/>
            
        </div>
    )
}

export default UserInfoForm;