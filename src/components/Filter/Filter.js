import React from "react";
import styles from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <div className={styles.Filter}>
    <label>
      Filter by name
      <input
        className={styles.filter__input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

export default Filter;
