import { useState, useEffect } from "react";
import axios from "axios";

function Definition({ combinedWordsArray, randomizer }) {
  const [definition, setDefinition] = useState('');
  const [answer, setAnswer] = useState({});

  // do we need this? randomWord is currently being used in dependancy array and nowhere else
  // const randomNum = props.randomizer(props.combinedWordsArray);
  // const randomWord = props.combinedWordsArray[randomNum];


  useEffect(() => {
    // define empty array to hold words and definitions
    const wordsAndDefsArray = [];

    // make another api call to dictionary api to get definitions for both words in combinedArray
    combinedWordsArray.map((wordObject) => {
      axios({
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordObject.word}`,
        method: "GET",
        dataResponse: "json",
      }).then((res) => {
        const definition = res.data[0].meanings[0].definitions[0].definition;
        // pair each word with the definition result
        const newObj = {
          word: wordObject.word,
          definition: definition
        }
        // push object with word and definition to empty array from above
        wordsAndDefsArray.push(newObj);
        // randomly select one of the objects inside wordsAndDefsArray and store the chosen word and definition in state
        const randomNum = randomizer(wordsAndDefsArray);
        setAnswer(wordsAndDefsArray[randomNum]);
        setDefinition(wordsAndDefsArray[randomNum].definition);
      });
    })
  }, [combinedWordsArray]);
  // console.log(answer);
  // console.log('-------');
  // console.log(definition);

  return (
    <div>
      <p>{definition}</p>
    </div>

  )
}
export default Definition;
