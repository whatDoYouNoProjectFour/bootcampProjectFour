import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Sorry Cal . It is not working now:)

function App() {
  const randomWords = ['air', 'coarse', 'knot', 'principal', 'flour', 'idle', 'stationary', 'maid', 'prophet', 'their'];

  //array with 10 objects: 10 homophones with 10 definitions;

  const [word, setWord] = useState('');
  const [noDef, setNoDef] = useState('');

  const randomize = (dfdf) => {
    const random = Math.floor(Math.random() * dfdf.length);
    return random
  }

  useEffect(() => {

    const randomNum = randomize(randomWords);

    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        md: "d",
        rel_hom: randomWords[randomNum],
      }
    }).then(res => {
      // need results at least 10 obj.
      // console.log(res);
      const wordWithDefinition = res.data.filter(res => res.defs);
      const wordWithoutDefinition = res.data.filter(res => !res.defs);
      const randomNum = randomize(wordWithDefinition);
      const noRandomNum = randomize(wordWithoutDefinition);
      setWord(wordWithDefinition[randomNum].word);
      setNoDef(wordWithoutDefinition[noRandomNum].word);
    });
  }, []);

  return (

    <div className="App">
      <h1>What Do You No?</h1>
      <button>{word}</button>
      <button>{noDef}</button>
    </div>
  );
}

export default App;