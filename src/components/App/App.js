import './App.css';
import {React, useState, useEffect} from 'react';
import Tricks from '../Tricks/Tricks'
import Form from '../Form/Form'

function App() {
const [tricks, setTricks] = useState([])
const url = "http://localhost:3001/api/v1/tricks"

useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => setTricks(data))
    .catch(e => console.log(e))

},[])

const addTrick = (newTrick) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrick),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setTricks([...tricks, newTrick]);
    })
    .catch(error => {
      console.error('Error during POST request:', error);
    });
};

const deleteTrick = (id) => {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
    .then(() => {
      const updatedTricks = tricks.filter(trick => trick.id !== id);
      setTricks(updatedTricks);
      console.log(`Trick with ID ${id} deleted`);
    })
    .catch(error => {
      console.error('Error during DELETE request:', error);
    });

return (
  <div className="App">
    <Form addTrick={addTrick} />
    <Tricks tricks={tricks} deleteTrick={deleteTrick} />
  </div>
);
}

  return (
    <div className="App">
      <Form addTrick={addTrick}/>
      <Tricks tricks={tricks} deleteTrick={deleteTrick}/>
    </div>
  );
}

export default App; 
