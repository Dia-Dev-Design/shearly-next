"use client";
import styles from "./page.module.css";
import React, { useState } from "react";
import ClientForm from "../components/signin/ClientSigninForm";
import ProviderForm from "../components/signin/ProviderSinginForm";

export default function Customer() {
  const [radio, setRadio] = useState(false);

  const handleInput = (e : boolean) => {
    setRadio(e);
  };

  return (
    <main className={styles.main}>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <label htmlFor={styles.option1} className={`${styles.option} ${styles.option1}`}>
            <input type="radio" name="selectProvider" id={styles.option1} checked={!radio} onChange={() => handleInput(false)} />
            <div className={styles.dot}></div>
            <span>Provider</span>
          </label>
          
          <label htmlFor={styles.option2} className={`${styles.option} ${styles.option2}`}>
            <input type="radio" name="selectClient" id={styles.option2} checked={radio} onChange={() => handleInput(true)} />
            <div className={styles.dot}></div>
            <span>Client</span>
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