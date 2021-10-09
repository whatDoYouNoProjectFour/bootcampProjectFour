import { useState, useEffect } from "react";
import axios from "axios";

function Definition(props) {
    // console.log(props.combinedWordsArray);
    
    const [newDefinition, setNewDefinition] = useState('');

    // console.log(props.combinedWordsArray[randomNum]);
    // console.log(props.combinedWordsArray);
    const randomNum = props.randomizer(props.combinedWordsArray);
    const randomWord = props.combinedWordsArray[randomNum];
    console.log(randomNum);

    const [questionWords, setQuestionWords] = useState([{
        word: "",
        definition: ""
    }]);

    console.log(randomWord);
    
    useEffect(() => {
        axios({
            url: `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`,
            method: "GET",
            dataResponse: "json",
            
        }).then((res) => {
            // console.log(res);

            const definition = res.data[0].meanings[0].definitions[0].definition;
            console.log('--------');
            console.log(definition)

            setQuestionWords();

            // const copyOfWord = [...randomWord];
            // const newArray = [];
            // const wordAndDef = {
            //     word: copyOfWord,
            //     def: definition
            // }

            // newArray.push(...newArray, wordAndDef);
            // props.setSdf(newArray);
            setNewDefinition(definition);
        });
    }, []);

    return (
        <div>
            <p>{newDefinition}</p>
        </div>
            
    )
}
export default Definition;
