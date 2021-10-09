import './App.css';
import axios from 'axios';
import Definition from './Definition.js';
import { useState, useEffect } from 'react';


function App() {
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  //array with 10 objects: 10 homophones with 10 definitions;

  const [word, setWord] = useState('');
  const [apiWord, setApiWord] = useState('');
  const [combinedWords, setCombinedWords] = useState([{
    word: "",
    definition: ""
  }]);
  const [sdf , setSdf] = useState([]);

 

  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  useEffect(() => {

    const randomNum = randomize(randomWords);
    const currentWord = randomWords[randomNum];
    setApiWord(currentWord);
  
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        md: "d",
        rel_hom: currentWord,
      }
    }).then(res => {
      // console.log(res.data);
      const wordWithDefinition = res.data.filter(res => res.defs); 
      setWord(wordWithDefinition[0].word)
      
      const combinedWordsArray = [];
      combinedWordsArray.push(currentWord, wordWithDefinition[0].word);
      // console.log(combinedWordsArray);
      setCombinedWords(combinedWordsArray.map((word) => {
        return { word: word, definition: "" }
      }));
      
      // console.log(combinedWordsArray);
      // const data = combinedWordsArray.filter(res => res.defs);
      
      
    });
  }, []);
  // console.log(combinedWords);

  return (

    <div className="App">
      <h1>What Do You No?</h1>
      <button>{apiWord}</button>
      <button>{word}</button>
      
      <Definition 
        combinedWordsArray={combinedWords}
        randomizer={randomize}
        sdf={sdf}
        setSdf={setSdf}
      />

      {/* <p> {definition}</p> */}
    </div>
  );
}

export default App;