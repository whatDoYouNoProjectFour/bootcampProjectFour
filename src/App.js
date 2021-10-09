import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  
  useEffect(() => {
    axios({
      url: 'https://api.datamuse.com/words',
      method: 'GET',
      dataResponse: 'json',
      params: {
        rel_hom: 'peace',
        // md: "d"
      }
    }).then(res => console.log(res));
    
  }, [])

  return (
    
    <div className="App">
      <h1>What Do You No?</h1>
    </div>
  );
}

export default App;