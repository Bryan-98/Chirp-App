import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUseName] = useState('');

  const submitUser = () =>{
    Axios('http://localhost:3001/api/insert', {
      firstName: firstName, 
      lastName: lastName, 
      userName: userName
    }).then(() => {
      alert("Success");
    }, (error) => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <h1>Azure SQL</h1>
      <div className='form'>
        <label>First Name</label>
          <input type="text" name="firstName" onChange={(e)=> {
            setFirstName(e.target.value)
          }}/>
        <label>Last Name</label>
          <input type="text" name="lastName" onChange={(e)=> {
            setLastName(e.target.value)
          }}/>
        <label>UserName</label>
          <input type="text" name="userName" onChange={(e)=> {
            setUseName(e.target.value)
          }}/>
        <button onClick={submitUser}>Submit</button>
      </div>
    </div>
  );
}

export default App;
