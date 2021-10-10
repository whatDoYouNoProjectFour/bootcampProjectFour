import './App.css';
import axios from 'axios';
import Definition from './Definition.js';
import { useState, useEffect } from 'react';


function App() {
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  //array with 10 objects: 10 homophones with 10 definitions;

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('')
  const [apiWord, setApiWord] = useState('');
  const [combinedWords, setCombinedWords] = useState([]);



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
      const wordWithDefinition = res.data.filter(res => res.defs);
      console.log(wordWithDefinition)
      setWord(wordWithDefinition[0].word)
      setDefinition(wordWithDefinition[0].defs[0])
    })
  }, []);

  return (

    <div className="App">
      <h1>What Do You No?</h1>
      <button>{apiWord}</button>
      <button>{word}</button>
      <p>{definition}</p>
      {/* <Definition
        combinedWordsArray={combinedWords[Math.floor(Math.random() * combinedWords.length)]}
        randomizer={randomize}
      /> */}

      {/* <p> {definition}</p> */}
    </div>
  );
}

export default App;