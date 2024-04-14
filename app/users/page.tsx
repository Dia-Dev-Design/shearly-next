"use client";
import styles from "./page.module.css";
// import Link from 'next/link';

export default function Users() {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Shearly</h1>
      </div>

      <div className={styles.body}>
        <h1>Welcome!</h1>

        <p>View Salons near you</p>

        <div className={styles.loginGrid}>
          <a className={styles.infoCard}>
            <h2> Provider</h2>
            
            <p>
              <button className={styles.button} role="button">Login</button>
            </p>

            <p>
              {/* First time you can sign in <Link href="#"> Here </Link>
              <span>First time you can</span> */}
              <button className={styles.button} role="button">Signup</button>
            </p>
          </a>

          <a className={styles.infoCard}>
            <h2>Customer</h2>

            <p>
              <button className={styles.button} role="button">Login</button>
            </p>

            <p>
              {/* First time you can sign in <Link href="#"> Here </Link>
              <span>First time you can</span> */}
              <button className={styles.button} role="button">Signup</button>
            </p> 
          </a>
        </div>
      </div> 
    </main>
  );
}