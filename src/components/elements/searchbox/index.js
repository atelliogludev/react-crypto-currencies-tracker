import React from "react";
import styles from './searchbox.module.css';

export const SearchBox = ({ value, onChange }) => {
  return (
    <div className={styles.searchBox} >
      <input
        className={styles.searchBoxInput}
        placeholder="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      ></input>
    </div>
  );
};
