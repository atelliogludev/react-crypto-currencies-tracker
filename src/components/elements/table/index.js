import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCurrencies from "../../../services/home/getCurrencies";
import { SearchBox } from "../searchbox";
import styles from "./table.module.css";
import millify from "millify";

export function Table() {
  const [currencies, setCurrencies] = useState([]);
  const [showCount, setShowCount] = useState(20);
  const [filteredCurrencies, setfilteredCurrencies] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getCurrencies().then((data) => {
      setCurrencies(data);
      setfilteredCurrencies(data);
    });
  }, []);

  useEffect(() => {
    const tempFilteredCurrencies = currencies.filter(
      (item) => item.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setfilteredCurrencies(tempFilteredCurrencies);
  }, [searchText]);

  const changeShowCount = () => {
    if (showCount === 20) {
      setShowCount(60);
    } else if (showCount === 60) {
      setShowCount(100);
    }
  };
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.tableBackground}></div>
      <div className={styles.listAreaWrapper}>
      <SearchBox onChange={setSearchText} value={searchText} />
      <div className={styles.tableWrapper}>
        <ul className={styles.mainList}>
          <li className={styles.tableHeader}>
            <span className={styles.rank}></span>
            <span>Name</span>
            <span>Price</span>
            <span>Marketcap</span>
            <span>24 Hr Volume</span>
            <span>Change Percent</span>
          </li>
          {filteredCurrencies.slice(0, showCount).map((item) => {
            return (
              <li key={`${item.name}${item.priceUsd}`}>
                <span className={styles.rank}>{item.rank}</span>

                <span>
                  <Link to={`/detail/${item.id}`}>
                    <img
                      className={styles.currencyLogo}
                      src={`https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                      alt={item.name}
                    ></img>
                    {item.name}
                  </Link>{" "}
                </span>

                <span>${millify(item.priceUsd)}</span>
                <span>${millify(item.marketCapUsd)}</span>
                <span>${millify(item.volumeUsd24Hr)}</span>
                <span className={parseFloat(item.changePercent24Hr) < 0 ? styles.downChange : styles.upChange}>{millify(item.changePercent24Hr)}%</span>
              </li>
            );
          })}
        </ul>
      </div>
      {showCount < 100 && (
        <div className={styles.viewMoreWrapper} >
          <button className={styles.viewMore} onClick={changeShowCount}>
            <span>View More</span>
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
