// packages
import axios from 'axios';
// import database from './firebase';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import MainGame from './components/MainGame';
import Score from './components/Score';
import ProgressBar from './components/ProgressBar';
import MainGame from './components/MainGame';
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
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(-1);
  const [progress, setProgress] = useState(null);

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
    setProgress(10);
    setRound(0);
    setStartingWord(newWord);
  }, []);


  // secondary effect to make api call and get homophones and definintions of randomWords
  useEffect(() => {
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
        // filter returned homophones for words that have valid definitions and store in state
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
        }).sort((homophone, startingWord) => homophone.sort - startingWord.sort);
        setCombinedWords(sorted);
      })
    }
  }, [round, startingWord, randomWords]);


  // event handler to pop another newWord from randomWords array and evaluate if word matches definition 
  const handleClick = (e, individualWord) => {
    const generateNewWord = () => {
      const copiedRandomWords = [...randomWords];
      const newWord = copiedRandomWords.pop();
      setStartingWord(newWord);
      setRandomWords(copiedRandomWords);
    }

    const updateRound = () => {
      setCombinedWords([]);
      setProgress(progress + 10)
      setTimeout(() => {
        setRound(round + 1);
        generateNewWord();
        setCheckAnswer(null);
      }, 1000);
    }
    
    // user can only choose answer when checkAnser === null
    if (checkAnswer === null) {
      if (individualWord.definition) {
        setCheckAnswer(true);
        console.log('you got it!');
        setScore(score + 1);
        updateRound();
      } else {
        updateRound();
      }
      // need to be more fancy
    } else {
      // alert("Don't even think about it")
    }
  }

  const clickHandle = function(e) {
    if (e.target.textContent === combinedWords[0].word) {
      console.log('you got it!');
    } else {
      console.log('wrong :(');
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <MainGame
          round={round}
          combinedWords={combinedWords}
          handleClick={handleClick}
          definition={definition}
          checkAnswer={checkAnswer}
        />

        <Score
          score={score}
          round={round}
          setRound={setRound}
        />

        <ProgressBar
          progress={progress}
        />  
      </main>


      <Footer />

    </div>
  );
}

export default App;