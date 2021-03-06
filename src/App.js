// packages
import axios from 'axios';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import MainGame from './components/MainGame';
import Score from './components/Score';
import PlayGame from './components/PlayGame';
// Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
// other files
import './styles/index.css';
import shuffle from './utilities.js';
import words from './constants.js';
// hooks
import { useState, useEffect } from 'react';

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
  const [serverDown, setServerDown] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);


  // effect to initiate starting states on page load
  useEffect(() => {
    const shuffledWords = shuffle([...words]);
    const newWord = shuffledWords.pop();
    setRandomWords(shuffledWords);
    setProgress(0);
    setRound(0);
    setStartingWord(newWord);
  }, [startNewGame]);

  // secondary effect to make api call and get homophones and definitions of randomWords
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
        if (homophone.statusText === "OK") {
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

          // error handling if api status does not equal "OK"
        } else {
          throw Error();
        }
      })
        .catch(() => {
          setServerDown(true);
        })
    }
  }, [round, startingWord, randomWords]);


  // event handler whenever word button is clicked
  const handleClick = individualWord => {
    // function to get another newWord
    const generateNewWord = () => {
      const copiedRandomWords = [...randomWords];
      const newWord = copiedRandomWords.pop();
      setStartingWord(newWord);
      setRandomWords(copiedRandomWords);
    }

    // function to update states when round changes
    const updateRound = () => {
      setCombinedWords([]);
      setProgress(progress + 10);
      setTimeout(() => {
        setDefinition('');
        generateNewWord();
        setCheckAnswer(null);
        setRound(round + 1);
      }, 600);
    }

    // condition to assess answer
    if (checkAnswer === null) {
      if (individualWord.definition) {
        updateRound();
        setCheckAnswer(true);
        setScore(score + 1);
      } else {
        updateRound();
        setCheckAnswer(false);
      }
    }
  }

  return (
    <div className="App">
      <Router>
        <Header />
        {
          serverDown === true ? (
            <main className="serverDown">
              <h2 className="serverDownHeader">Server Down</h2>
              <p>Try later</p>
            </main>
          ) : (
            <main>
              <Route exact path="/">
                <PlayGame />
              </Route>

              <Route path="/game">
                <MainGame
                  round={round}
                  combinedWords={combinedWords}
                  handleClick={handleClick}
                  definition={definition}
                  checkAnswer={checkAnswer}
                />
                <Score
                  score={score}
                  setScore={setScore}
                  round={round}
                  setRound={setRound}
                  startNewGame={startNewGame}
                  setStartNewGame={setStartNewGame}
                />
              </Route>
            </main>
          )
        }
        <Footer progress={progress} />
      </Router>
    </div>
  );
}

export default App;