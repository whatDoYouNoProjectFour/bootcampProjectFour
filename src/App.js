import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


function App() {
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  //array with 10 objects: 10 homophones with 10 definitions;

  // const [randomWord, setRandomWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [combinedWords, setCombinedWords] = useState([]);



  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  // random word api 
  // https://random-word-api.herokuapp.com/word?number=20

  // useEffect(() => {
  //   axios({
  //     url: 'https://random-word-api.herokuapp.com/word?number=20',
  //     method: 'GET',
  //     dataResponse: 'json'
  //   }).then(res => {
  //     const apiWords = res.data[1];
  //     // console.log(apiWords);
  //     setRandomWord(apiWords);
  //   })

  // }, [])

  // console.log(randomWord);
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
      console.log(res)
      const wordWithDefinition = res.data.filter(res => res.defs);
      console.log(wordWithDefinition);

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
    </div>
  );
}

export default App;