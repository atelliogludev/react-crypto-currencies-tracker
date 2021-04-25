import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a className={styles.footerLink} href="https://github.com/atelliogludev">
        © 2021 - https://github.com/atelliogludev
      </a>
    </div>
  );
}
