import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebaseApp } from "./api/firebase";

export const Login = ({onLogin}) => {
  const [email, setEmail] = useState();
  const [pass, setPassword] = useState();
  const history = useHistory();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    firebaseApp.auth().signInWithEmailAndPassword(email, pass).then((user) => {
      onLogin(user);
      history.replace({pathname: "/"});
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" onChange={e => setEmail(e.target.value)}></input>
      <input type="password" onChange={e => setPassword(e.target.value)}></input>
      <button>Login</button>
    </form>
  )
}
