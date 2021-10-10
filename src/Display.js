<<<<<<< HEAD
=======
import axios from 'axios';
import { useEffect } from 'react';

const Display = () => {

    useEffect(() => {
        // console.log(data.word);
        // console.log(data.defs);
        axios({
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/prop`,
            method: "GET",
            dataResponse: "json",

        }).then(res => {
            console.log(res);

        });

    })
    return (
        <div>
            <h2>asdasd</h2>
        </div>
    )
}

export default Display;
>>>>>>> main
