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
      let unshuffled = [wordWithDefinition[0].word, currentWord]
      console.log(unshuffled);
      // added sort property to use sort array built-in function.
      let shuffled = unshuffled.map(word => {
        if (wordWithDefinition[0].word === word ) {
          return ({
            word,
            definition: wordWithDefinition[0].defs[0],
            sort: Math.random(),
          })
        } else {
          return ({
            word,
            sort: Math.random(),
          })
        }
      })
        // shuffled by sort value
        .sort((a, b) => a.sort - b.sort)
      setCombinedWords(shuffled);
      console.log(shuffled);
    })
  }, []);
  // console.log(combinedWords[0].val, combinedWords[1].val)
  console.log(combinedWords);

  const clickHandle = function(e) {
    if (e.target.textContent === combinedWords[0].word && combinedWords[0].hasOwnProperty(definition)) {
      console.log('you got it!');
    } else {
      console.log('wrong :(');
    }
  }

  return (
    <div className="App">

      <h1>What Do You No?</h1>
      {
        combinedWords.map((individualWord, index) => {
          return (
            <button key={index}
            onClick={clickHandle}>
              {individualWord.word}
            </button>
          )
        })
      }
      <p>{definition}</p>
      <Score />

      <Footer />
    </div>
  );
}

export default App;
