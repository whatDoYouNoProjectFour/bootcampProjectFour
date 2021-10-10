import { useState, useEffect } from "react";
import axios from "axios";

function Definition(props) {
    // console.log(props.combinedWords);
    const [definition, setDefinition] = useState('');
    const [answer, setAnswer] = useState({});
  

    const randomNum = props.randomizer(props.combinedWordsArray);
    const randomWord = props.combinedWordsArray[randomNum];

    
    useEffect(() => {
        const wordsAndDefsArray = [];

        props.combinedWordsArray.map((wordObject) => {
            
            axios({
                url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`,
                method: "GET",
                dataResponse: "json",       
            }).then((res) => {
                const definition = res.data[0].meanings[0].definitions[0].definition;
                
                const newObj = {
                    word: wordObject.word,
                    definition: definition
                }
                wordsAndDefsArray.push(newObj);
                
                
            

                const randomNum = props.randomizer(wordsAndDefsArray);
                setAnswer(wordsAndDefsArray[randomNum]);
                setDefinition(wordsAndDefsArray[randomNum].definition);
            });     
        })
    }, [props.combinedWordsArray]);
    console.log(answer);
    console.log('-------');
    console.log(definition);

    return (
        <div>
            <p>{definition}</p>
        </div>
            
    )
}
export default Definition;