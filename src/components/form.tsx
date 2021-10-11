import React, { useState } from 'react';
import styles from './form.module.css';

export function Form() {
  const [name, setName] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [response, setResponse] = useState();

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name === '' && favoriteColor === '') {
      return;
    }

    const res = await fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({ name, favoriteColor }),
    }).then((res) => res.json());

    setResponse(res);
    setName('');
    setFavoriteColor('');
  }

  return (
    <>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          name="name"
          id="name"
          className={styles.input}
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        
        <label htmlFor="favoriteColor" className={styles.label}>
          Favorite Color
        </label>
        <input
          name="favoriteColor"
          id="favoriteColor"
          className={styles.input}
          type="text"
          onChange={(e) => setFavoriteColor(e.target.value)}
          value={favoriteColor}
        />

        <button className={styles.button}>Submit</button>
      </form>
    </>
  );
}
