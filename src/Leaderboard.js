import database from './firebase.js'
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(function() {

        const dbRef = ref(database);

        onValue(dbRef, function(databaseShot) {
            console.log(databaseShot.val());

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

    return (

        <div>
            <form>
            <label htmlFor="userName">Type your name</label>
            <input type="text" 
            id="userName" 
            onChange={userNameChange}/>

            <button type="submit">Get your score on the board!</button>
            </form>
        </div>
    )
}

export default Leaderboard;