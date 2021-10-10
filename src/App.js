import './App.css';
import axios from 'axios';
import Definition from './Definition.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';


function App() {
  // hardcoded array of 10 homophonous words
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  // state variables
  const [word, setWord] = useState('');
  const [apiWord, setApiWord] = useState('');
  const [combinedWords, setCombinedWords] = useState([{
    word: "",
    definition: ""
  }]);

  // function to randomly select an item from an array
  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  useEffect(() => {
    // get random word from hardcoded array to pass into axios query param
    const randomNum = randomize(randomWords);
    const currentWord = randomWords[randomNum];
    setApiWord(currentWord);
  
    // make call to datamuse api to get homophones 
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        md: "d",
        rel_hom: currentWord,
      }
    }).then(res => {
      // filter out words that don't have definitions and store result in state
      const wordWithDefinition = res.data.filter(res => res.defs); 
      setWord(wordWithDefinition[0].word)
      // put currentWord and api result word into a single array
      const combinedWordsArray = [];
      combinedWordsArray.push(currentWord, wordWithDefinition[0].word);
      setCombinedWords(combinedWordsArray.map((word) => {
        return { word: word, definition: "" }
      }));
    });
  }, []);

  return (
    <div className="App">
      <h1>What Do You No?</h1>
      <button>{apiWord}</button>
      <button>{word}</button>
      
      <Definition 
        combinedWordsArray={combinedWords}
        randomizer={randomize}
      />


      <Footer />
    </div>
  );
}

export default App;