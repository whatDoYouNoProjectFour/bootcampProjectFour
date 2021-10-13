import './App.css';
import axios from 'axios';
// import database from './firebase';
import Footer from './Footer';
import Score from './Score';
import { useState, useEffect } from 'react';

function App() {
  // hardcoded array of 10 homophonous words
  // declare state variables 
  const [randomWords, setRandomWords] = useState([]);
  const [definition, setDefinition] = useState('');
  const [combinedWords, setCombinedWords] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(null);
  // added score useState to update user score.
  const [score, setScore] = useState(0);
  // added round useState to re-render the useEffect that update new word for next question. This will update when user got the right answer.
  const [round, setRound] = useState(0);

  // function to randomly select an item from an array
  const randomize = (randomArray) => {
    const random = Math.floor(Math.random() * randomArray.length);
    return random
  }

  // Setting the random words array in state when app loads for the first time
  useEffect(() => {
    setRandomWords(['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'])
  }, []);

  useEffect(() => {
    const startingWord = randomWords[randomize(randomWords)];

    if (startingWord !== undefined) {
      // get random word from hardcoded array to pass into axios query param
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
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [round, randomWords]);

  // event handler to evaluate if word matches definition and increases score
  const handleClick = (e, individualWord) => {

    // Will add score when user got the right answer
    // Also going to update round useState to re-render the useEffect

    // user can only choose answer when checkAnser === null
    if (checkAnswer === null) {

      if (individualWord.definition) {
        console.log('you got it!');
        setScore(score + 1);
        setCheckAnswer(true);
        setTimeout(() => {
          setRound(round + 1)
          setCheckAnswer(null)
        }, 3000);
      } else {
        // Even user got wrong answer, update round to display next question.
        setCheckAnswer(false);
        setTimeout(() => {
          setRound(round + 1)
          setCheckAnswer(null)
        }, 3000);
      }

      // need to be more fancy
    } else {
      alert("Don't even think about it")
    }
  }

  return (
    <div className="App">
      <h1>What Do You No?</h1>

      {/* display buttons until round 10 */}
      {
        round < 10 ? (
          combinedWords.map((individualWord, index) => {
            return (
              <button key={index} onClick={(e) => { handleClick(e, individualWord) }}>
                {individualWord.word}
              </button>
            )
          })
        ) : null
      }
      {/* display definition until round 10 */}
      {
        round < 10 ? (
          <p>{definition}</p>
        ) : null
      }

      {
        // user can only see this message whene checkAnser true or false
        checkAnswer === null ? null : (
          <p>
            {
              checkAnswer === true ? (
                <p>right</p>
              ) : (<p>wrong</p>)
            }
          </p>
        )
      }

      {/* added score property to update score */}
      {/* added round,setRound property to update round and make ternary operator for contents */}
      <Score
        score={score}
        round={round}
        setRound={setRound}
      />
      <Footer />
    </div>
  );
}

export default App;
