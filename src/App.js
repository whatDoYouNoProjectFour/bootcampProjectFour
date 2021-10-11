import './App.css';
import axios from 'axios';
import Footer from './Footer';
import Score from './Score';
import { useState, useEffect } from 'react';


function App() {
  // hardcoded array of 10 homophonous words
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  // declare state variables 
  const [definition, setDefinition] = useState('');
  const [combinedWords, setCombinedWords] = useState([]);

  // added score useState to update user score.
  const [score, setScore] = useState(0);
  // added round useState to re-render the useEffect that update new word for next question. This will update when user got the right answer.
  const [round, setRound] = useState(0);

  // function to randomly select an item from an array
  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }
  // function to add score when user got the right answer
  // Also going to update round useState to re-render the useEffect
  const increaseScore = () => {
    setScore(score + 1);
    setRound(round + 1);
  }

  useEffect(() => {
    // get random word from hardcoded array to pass into axios query param
    const randomNum = randomize(randomWords);
    const startingWord = randomWords[randomNum];
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        md: "d",
        rel_hom: startingWord,
      }
    }).then(homophone => {
      // filter returned words for words that have valid definitions and store in state
      const wordWithDefinition = homophone.data.filter(homophone => homophone.defs);
      setDefinition(wordWithDefinition[0].defs[0]);

      const unshuffled = [wordWithDefinition[0].word, startingWord]
      // map unshuffled array to produce a new array of shuffled objects that contain the word and definition
      const shuffled = unshuffled.map(word => {
        // condition to check if word has a definition (always the api result) and return an object with that property
        if (wordWithDefinition[0].word === word) {
          return ({
            word,
            definition: wordWithDefinition[0].defs[0],
            sort: Math.random(),
          })
          // don't return definition property if it is the hardcoded original word
        } else {
          return ({
            word,
            sort: Math.random(),
          })
        }
      })
        // use sort method to randomly change order of objects in array
        .sort((a, b) => a.sort - b.sort)

      // store shuffled result in state
      setCombinedWords(shuffled);
      console.log(shuffled);
    })
    // needs to be dependant on click event handler -- ADD IN ONCE FUNCTION IS FINISHED
  }, [round]);
  // console.log(combinedWords[0].val, combinedWords[1].val)
  console.log(combinedWords);

  // event handler to evaluate if word matches definition and increases score
  const handleClick = (e, individualWord) => {

    // added individualWord parameter to check if there is a definition property.

    // console.log(e.target.textContent);
    // console.log(typeof (individualWord.definition))


    // FIX ME

    if (individualWord.definition) {
      console.log('you got it!');
      increaseScore()
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
            <button key={index} onClick={(e) => { handleClick(e, individualWord) }}>
              {individualWord.word}
            </button>
          )
        })
      }
      <p>{definition}</p>
      {/* added score property to update score */}
      <Score
        score={score} />

      <Footer />
    </div>
  );
}

export default App;