import database from '../firebase.js'
import { useEffect, useState, useRef } from 'react';
import { onValue, ref, push } from 'firebase/database';
import Leaderboard from './Leaderboard.js';

import { Link } from 'react-router-dom';


// firebase logic 

function UserInfoForm({ finalScore, setStartNewGame, startNewGame, setScore, setRound }) {
    // State to hold new object with user name and score
    const [leaderboard, setLeaderboard] = useState([]);
    // State to keep track of user name input
    const [userName, setUserName] = useState('');

    useEffect(function () {
        // Referencing the firebase database
        const dbRef = ref(database);
        // Function 
        onValue(dbRef, function (databaseShot) {

            const data = databaseShot.val();
            // Empty array which will hold each user info object
            const leaderboardArray = [];
            // Looping through the object coming back from firebase
            for (let property in data) {
                const userInfoObject = {
                    key: property,
                    userName: data[property].username,
                    userScore: data[property].score
                }
                // Adding new items to the beginning of the array
                leaderboardArray.unshift(userInfoObject);
            }
            // Updating state with the array
            setLeaderboard(leaderboardArray);
        })
    }, []);
    // Function to keep track of any changes being made in input
    const userNameChange = function (event) {
        setUserName(event.target.value);
    }
    // Function created to push data to firebase on submit
    const submitHandle = function (e) {
        e.preventDefault();
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
    // Function created to scroll to a specific element when sumbit button is clicked
    const scrollToComments = function () {
        window.scrollTo({ top: leaderboardScroll.current.offsetTop, behavior: 'smooth' });
    }
    // Function created to give the users the option of playing again which will rerender the starting page
    const restartGame = () => {
        setStartNewGame(!startNewGame)
        setScore(0)
        setRound(0)
    }

    return (
        <div className="wrapper">
            <form onSubmit={submitHandle}>
                <input
                    required
                    type="text"
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

                <Link to={"/"} className="startButton" onClick={restartGame}>Click to play again!</Link>

            </form>

            <div ref={leaderboardScroll}>
                <Leaderboard
                    leaderboard={leaderboard} />
            </div>

        </div>
    )
}

export default UserInfoForm;