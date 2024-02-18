"use client"
import styles from "./page.module.css";
import React, { useState } from "react"

export default function Provider() {
  const [login, setLogin] = useState({
        email: "",
        password: ""
  });

  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setLogin((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

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

      setLoginSuccess(true)
    })
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Sign In as Provider</h1>

        {loginSuccess ?
            <h1>Signed In</h1>
        :
        <form method="GET" action="#mongooseEmail" onSubmit={submitForm} className={styles.form}>
          <div className={styles.div}>
            <label>Email</label>
            <input type="text" name="email" onChange={handleInput} value={login.email} />
          </div>

          <div className={styles.div}>
            <label>Password</label>
            <input type="password" name="password" onChange={handleInput} value={login.password}></input>
          </div>

          <button type="submit">Sign In</button>
        </form>
      }
      </div>
    </main>
  );
}