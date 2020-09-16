
import React from 'react';
import { useForm } from 'react-hook-form';
// import Database from "./components/Database";
// import main from "./components/main";
import "./App.css";

type Profile = {
  firstname: string
  lastname: string
}

function App() {

  const {register, handleSubmit, errors } = useForm<Profile>()

  const Submit = handleSubmit((data) =>{
    alert(JSON.stringify(data))
  })

  return (
    <div className="App">
      <h1>Hello Maipato</h1>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input ref={register({ required: true })} id="firstname" name="firstname" type="type" ></input>
          {
            errors.firstname && <div className="error">Enter firstName</div>
          }
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input ref={register({required: true })} id="lastname" name="lastname" type="type" ></input>
          {
            errors.lastname && <div className="error">Enter lastName</div>
          }
        </div>
        <button type="submit" >Save</button>
      </form>

      {/* <Database/> */}

    </div>
  );
}

export default App;