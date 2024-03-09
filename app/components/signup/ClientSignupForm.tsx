"use client";
import styles from "./styles.module.css";
import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ClientSignupFormr() {
  const [signup, setSignup] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
  });

  const handleInput = (e : any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setSignup((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e : any) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    // Turn our formData state into data we can use with a form submission
    Object.entries(signup).forEach(([key, value]) => {
      data.append(key, value);
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
    .then((data) => {
      setSignup({
        name: "",
        email: "",
        phone: "",
        password: ""
      })
    })
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Sign Up as Client</h1>
        
        <form method="POST" action="#mongooseEmail" onSubmit={submitForm} className={styles.form}>
          <div className={styles.field}>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleInput} value={signup.name} placeholder="..." />
          </div>

          <div className={styles.field}>
            <label>Email:</label>
            <input type="text" name="email" onChange={handleInput} value={signup.email} placeholder="..." />
          </div>

          <div className={styles.field}>
            <label>Phone:</label>
            <PhoneInput country={'us'} value={signup.phone} onChange={phone => setSignup(prevState => ({ ...prevState,phone}))} placeholder="..." /> 
          </div> 

          <div className={styles.field}>
            <label>Password:</label>
            <input 
                type="password" 
                name="password" 
                onChange={handleInput} 
                value={signup.password} 
                pattern="[a-z]{0,9}" //add if possible or wanted {#@$!}
                title="Password should be digits (0 to 9) or alphabets (a to z)."
                placeholder="..."
            />
          </div>

          <div className={styles.field}>
            <label>Re-Enter Password:</label>
            <input type="password" name="re-enter-password" onChange={handleInput} value={signup.password} placeholder="..." />
          </div>

          <button type="submit">Sign Up</button>
        </form>

        <button>Cancel</button>
      </div>
    </main>
  );
}