import { useState, useEffect } from "react";
import axios from "axios";

function Definition(props) {
    console.log(props.combinedWordsArray);
    
    const [newDefinition, setNewDefinition] = useState('');

    const randomNum = props.randomizer(props.combinedWordsArray);
    const randomWord = props.combinedWordsArray[randomNum];
    // console.log(randomWord);
    
    useEffect(() => {
        const wordsAndDefsArray = [];

        props.combinedWordsArray.map((wordObject) => {
            
            axios({
                url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`,
                method: "GET",
                dataResponse: "json",       
            }).then((res) => {
                const definition = res.data[0].meanings[0].definitions[0].definition;
                // console.log('--------');
                // console.log(definition)
                
                const newObj = {
                    word: wordObject.word,
                    definition: definition
                }
                wordsAndDefsArray.push(newObj);
                // newArray.push(...newArray, wordAndDef);
                // props.setSdf(newArray);
            });     
        })
        // const randomNum = props.randomizer(wordsAndDefsArray);
        console.log(wordsAndDefsArray);
        // setNewDefinition(wordsAndDefsArray);
    }, [randomWord]);
    

    return (
        <div>
            <p>{newDefinition}</p>
        </div>
            
    )
}
export default Definition;




// useEffect(() => {
//     const wordsAndDefsArray = [];

//     props.combinedWordsArray.map((wordObject) => {
        
//         axios({
//             url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`,
//             method: "GET",
//             dataResponse: "json",       
//         }).then((res) => {
//             const definition = res.data[0].meanings[0].definitions[0].definition;
//             // console.log('--------');
//             // console.log(definition)
            
//             const newObj = {
//                 word: wordObject.word,
//                 definition: definition
//             }
//             wordsAndDefsArray.push(newObj);
            
            
            
//             // newArray.push(...newArray, wordAndDef);
//             // props.setSdf(newArray);
//             // setNewDefinition(wordsAndDefsArray);
//         });     
//     })
//     console.log(wordsAndDefsArray);
// }, [randomWord]);
