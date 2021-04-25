import React from "react";
import styles from "./rate.module.css";
import millify from "millify";

export default function RateData({ rateData }) {
  return (
    <div className={styles.rateWrapper}>
      <div className={styles.rateContainer}>
        <ul className={styles.rateDataList}>
          <li>
            <div className={styles.rankFlag}>
              <div className={styles.rankFlagBefore}></div>
              <div className={styles.innerFlag}>
                <span>Rank</span>
                <span>{rateData.rank}</span>
              </div>
            </div>
          </li>
          <li>
            <div>
              <span className={styles.cryptoName}>
                {rateData.name}({rateData.symbol})
              </span>
              <div className={styles.cryptoContainer}>
                <span className={styles.cryptoPrice}>
                  ${millify(rateData.priceUsd)}
                </span>
                <span className={`${styles.cryptoChange} ${parseFloat(rateData.changePercent24Hr) < 0 && styles.cryptoChangeDown}`}>
                  {millify(rateData.changePercent24Hr)}%
                </span>
              </div>
            </div>
          </li>
          <li className={styles.mobileBreak}></li>
          <li>
            <span>Market Cap</span>
            <span>${millify(rateData.marketCapUsd)}</span>
          </li>
          <li>
            <span>24 Hr Volume</span>
            <span>${millify(rateData.volumeUsd24Hr)}</span>
          </li>
          <li>
            <span>Supply</span>
            <span>${millify(rateData.supply)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
