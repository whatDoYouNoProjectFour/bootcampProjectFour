import '../styles/App.css';
import axios from 'axios';
import Footer from './Footer';
import Score from './Score';
import { useState, useEffect } from 'react';


const App = () => {
  // hardcoded array of 10 homophonous words
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  const [ourWord, setOurWord] = useState({word: '', definition: ''});
  const [homophone, setHomophone] = useState({word: '', definition: ''});
  const [combineDefinitions, setCombineDefinitions] = useState([])
 

  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  const randomKey = (randomArray) => {
    const random = Math.floor(Math.random() * 2);
    return random
  }

  // Randomly pick a word from the list of 10 words  
  const startingWord = randomWords[randomize(randomWords)];


  // First useEffect API call to return ourWord state, which is an object with word and its definition
  useEffect(() => {
    const promise1 = axios({
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${startingWord}`,

    })
    const promise2 = axios({
        url: 'https://api.datamuse.com/words',
        method: 'GET',
        dataResponse: 'json',
        params: {
            md: "d",
            rel_hom: startingWord,
        }
    })
    Promise.all([promise1, promise2]).then(([resultFromPromise1, resultFromPromise2])=>{
        const arr = [];
        arr.push({
            key: 0,
            word: resultFromPromise1.data[0].word,
            definition: resultFromPromise1.data[0].meanings[0].definitions[0].definition
        })
        const wordWithDefinition = resultFromPromise2.data.filter(homophone => homophone.defs);
        arr.push({
            key: 1,
            word: wordWithDefinition[0].word,
            definition: wordWithDefinition[0].defs[0]
        })
        setCombineDefinitions(arr)
    });
}, [])


    // if (ourWord.key === 0) {
    //   setDefinition(ourWord.definition)
    // } else {
    //   setDefinition(homophone.definition)
    // }

  

  // <p> we want to display a randomly selected definition from either ourWord object or homophone object  

  return (
    <div className="App">
      <h1>What Do You No?</h1>
      <button>{combineDefinitions[0].word}</button>
      <button>{combineDefinitions[1].word}</button>
      <p></p>
      <Score />

      <Footer />
    </div>
  );
}

export default App;