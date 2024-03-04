"use client"
import styles from "./page.module.css";
import React, { useState } from "react";
import ClientForm from "./Components/ClientSigninForm";
import ProviderForm from "./Components/ProviderSinginForm"

export default function Customer() {
  const [radio, setRadio] = useState(false);

  const handleInput = (value) => {
    setRadio(value);
  }

  return (
    <main className={styles.main}>
      <div className={styles.body}> {!radio ?
        <div>
            <div className={styles.wrapper}>
                <input type="radio" name="select" id={styles.option1} checked={!radio} onChange={() => handleInput(false)}/>
                <input type="radio" name="select" id={styles.option2} checked={radio} onChange={() => handleInput(true)}/>
                <label htmlFor="option1" className={`${styles.option} ${styles.option1}`}>
                    <div className={styles.dot}></div>
                    <span>Provider</span>
                </label>
                <label htmlFor="option2" className={`${styles.option} ${styles.option2}`}>
                    <div className={styles.dot}></div>
                    <span>Customer</span>
                </label>
            </div>

            <div>
                <ProviderForm />
            </div>
        </div>
        :
        <div>
            <div className={styles.wrapper}>
                <input type="radio" name="select" id={styles.option1} checked={!radio} onChange={() => handleInput(false)}/>
                <input type="radio" name="select" id={styles.option2} checked={radio} onChange={() => handleInput(true)}/>
                <label htmlFor="option1" className={`${styles.option} ${styles.option1}`}>
                    <div className={styles.dot}></div>
                    <span>Provider</span>
                </label>
                <label htmlFor="option2" className={`${styles.option} ${styles.option2}`}>
                    <div className={styles.dot}></div>
                    <span>Customer</span>
                </label>
            </div>

            <div>
                <ClientForm />
            </div>
        </div>
        }
      </div>
    </main>
  );
}