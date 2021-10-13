// packages
import axios from 'axios';
// import database from './firebase';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import Score from './components/Score';
// other files
import './styles/App.css';
// hooks
import { useState, useEffect } from 'react';
// import Leaderboard from './components/Leaderboard';

// static array of homophonous words
const WORDS = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];


function App() {
  // declare state variables 
  const [randomWords, setRandomWords] = useState([]);
  const [startingWord, setStartingWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [combinedWords, setCombinedWords] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(null);
  // added score useState to update user score.
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(-1);

  // const randomize = (randomArray) => {
  //   const random = Math.floor(Math.random() * randomArray.length);
  //   return random
  // }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // effect to initiate starting states on page load
  useEffect(() => {
    const shuffledWords = shuffle([...WORDS]);
    const newWord = shuffledWords.pop();
    setRandomWords(shuffledWords);
    setRound(0);
    setStartingWord(newWord);
  }, []);


  // secondary effect to make api call and get homophones and definintions of randomWords
  useEffect(() => {
    // console.log(randomWords);

    if (startingWord !== '' && startingWord !== undefined) {
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

        const unsorted = [wordWithDefinition[0].word, startingWord]
        // map unsorted array to produce a new array of sorted objects that contain the word and definition
        const sorted = unsorted.map(word => {
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
          .sort((homophone, startingWord) => homophone.sort - startingWord.sort);

        // store sorted result in state
        setCombinedWords(sorted);
      })
    }
  }, [round, startingWord, randomWords]);

  // event handler to pop another newWord from randomWords array and evaluate if word matches definition 
  const handleClick = (e, individualWord) => {
    const copiedRandomWords = [...randomWords];
    const newWord = copiedRandomWords.pop();
    setStartingWord(newWord);
    setRandomWords(copiedRandomWords);

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
      // alert("Don't even think about it")
    }
    // console.log(score);
    // console.log(round);
  }

  return (
    <div className="App">
      <Header />

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

      {/* <Leaderboard 
      finalScore={round}
      /> */}
      
      <Footer />
    </div>
  );
}

export default App;
