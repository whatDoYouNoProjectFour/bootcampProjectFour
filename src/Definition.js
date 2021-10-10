import { useState, useEffect } from "react";
import axios from "axios";

function Definition(props) {
    const [data, setData] = useState('')
    useEffect(() => {
        setData(props.combinedWordsArray.word);

        axios({
            // console.log(randomWord);
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`,
            method: "GET",
            dataResponse: "json",
        }).then((res) => {
            const definition = res.data[0].meanings[0].definitions[0].definition;
            console.log(definition)
            // const wordsAndDefsArray = [];

        });
    }, []);

    return (
        <div>
            <p></p>
        </div>

    )
}
export default Definition;