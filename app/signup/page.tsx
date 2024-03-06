"use client"
import styles from "./page.module.css";
import React, { useState } from "react";
import ClientForm from "./Components/ClientSignupForm";
import ProviderForm from "./Components/ProviderSignupForm";

export default function SignUp() {
  const [radio, setRadio] = useState(false);

  const handleInput = (value) => {
    setRadio(value);
  }

  return (
    <main className={styles.main}>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <label htmlFor={styles.option1} className={`${styles.option} ${styles.option1}`}>
            <input type="radio" name="select" id={styles.option1} checked={!radio} onChange={() => handleInput(false)} />
            <div className={styles.dot}></div>
            <span>Provider</span>
          </label>
          <label htmlFor={styles.option2} className={`${styles.option} ${styles.option2}`}>
            <input type="radio" name="select" id={styles.option2} checked={radio} onChange={() => handleInput(true)} />
            <div className={styles.dot}></div>
            <span>Customer</span>
          </label>
        </div>

        {!radio ?
          <div>
            <ProviderForm />
          </div>
          :
          <div>
            <ClientForm />
          </div>
        }
      </div>
    </main>
  );
}