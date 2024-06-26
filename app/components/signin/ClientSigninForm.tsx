"use client";
import styles from "./styles.module.css";
import React, { useState } from "react";

export default function ClientSigninForm() {
  const [login, setLogin] = useState({
        email: "",
        password: ""
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInput = (e : any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setLogin((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  };

  const submitForm = (e : any) => {
    // We don't want the page to refresh
    e.preventDefault();

    const formURL = e.target.action;
    const data = new FormData();

    // Turn our formData state into data we can use with a form submission
    Object.entries(login).forEach(([key, value]) => {
      data.append(key, value);
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "GET",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setLogin({
        email: "",
        password: ""
      })

      setLoginSuccess(true);
    })
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Sign In as Client</h1>

        {loginSuccess ?
            <h1>Signed In</h1>
        :
        <form method="GET" action="#mongooseEmail" onSubmit={submitForm} className={styles.form}>
          <div className={styles.field}>
            <label>Email:</label>
            <input type="text" name="email" onChange={handleInput} value={login.email} placeholder="..." />
          </div>

          <div className={styles.field}>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleInput} value={login.password} placeholder="..." />
          </div>

          <button type="submit">Sign In</button>
        </form>
      }
      </div>
    </main>
  );
}