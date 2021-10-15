import database from '../firebase.js'
import { useEffect, useState, useRef } from 'react';
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
        event.preventDefault();

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

    const leaderboardScroll = useRef(null);

    const scrollToComments = function() {
        window.scrollTo({top: leaderboardScroll.current.offsetTop, behavior: 'smooth'});
    }
    
    return (
        <div className="wrapper">
            <form onSubmit={submitHandle}>
                <input type="text" 
                id="userName" 
                onChange={userNameChange}
                value={userName}
                />
                <label htmlFor="userName">Name</label>

                <p>Your final score is {finalScore}</p>

                <button type="submit"
                onClick={scrollToComments}>
                    Get your score on the board!
                </button>
            </form>

            <div ref={leaderboardScroll}>
                <Leaderboard 
                leaderboard={leaderboard}/>
            </div>
            
        </div>
    )
}

export default UserInfoForm;