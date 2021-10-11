import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  //array with 10 objects: 10 homophones with 10 definitions;

  // const [randomWord, setRandomWord] = useState('')
  const [definition, setDefinition] = useState('');
  const [combinedWords, setCombinedWords] = useState([])


  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  useEffect(() => {

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
      const wordWithDefinition = res.data.filter(res => res.defs);

      setDefinition(wordWithDefinition[0].defs[0]);
      let unshuffled = [wordWithDefinition[0].word, currentWord]
      // added sort property to use sort array built-in function.
      let shuffled = unshuffled.map(val => {
        if (wordWithDefinition[0].word === val) {
          return ({
            val,
            definition: wordWithDefinition[0].defs[0],
            sort: Math.random(),
          })
        } else {
          return ({
            val,
            sort: Math.random(),
          })
        }
      })
        // shuffled by sort value
        .sort((a, b) => a.sort - b.sort)

      //   // return only value which is 'word' to shuffled variable.
      // .map(({ val, definition }) => val, definition)
      setCombinedWords(...combinedWords, shuffled);
    })
  }, []);
  // console.log(combinedWords[0].val, combinedWords[1].val)
  console.log(combinedWords);

  return (

    <div className="App">

      <h1>What Do You No?</h1>

      {
        combinedWords.map((res, index) => {
          return (
            <button key={index}>
              {res.val}
            </button>
          )
        })
      }

      {/* <button>{combinedWords[0].val}</button>
      <button>{combinedWords[1].val}</button> */}
      <p>{definition}</p>
    </div>
  );
}

export default App;
