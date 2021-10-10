import './App.css';
import axios from 'axios';
import Footer from './Footer';
import Score from './Score';
import { useState, useEffect } from 'react';


function App() {
  // hardcoded array of 10 homophonous words
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  // const [randomWord, setRandomWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [combinedWords, setCombinedWords] = useState([]);

  // function to randomly select an item from an array
  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  useEffect(() => {
    // get random word from hardcoded array to pass into axios query param
    const randomNum = randomize(randomWords);
    const currentWord = randomWords[randomNum];
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        md: "d",
        rel_hom: currentWord,
      }
    }).then(res => {
      // filter returned words for words that have valid definitions
      const wordWithDefinition = res.data.filter(res => res.defs);

      setDefinition(wordWithDefinition[0].defs[0]);
      let unshuffled = [wordWithDefinition[0].word + `(data from api)`, currentWord]
      // added sort property to use sort array built-in function.
      let shuffled = unshuffled.map(val => ({ val, sort: Math.random() }))
        // shuffled by sort value
        .sort((a, b) => a.sort - b.sort)
        // return only value which is 'word' to shuffled variable.
        .map(({ val }) => val)
      // console.log(shuffled);    check with this console.log
      setCombinedWords(shuffled)
    })
  }, []);

  console.log(combinedWords);

  return (
    <div className="App">

      <h1>What Do You No?</h1>
      <button>{combinedWords[0]}</button>
      <button>{combinedWords[1]}</button>
      <p>{definition}</p>
      <Score />

      <Footer />
    </div>
  );
}

export default App;