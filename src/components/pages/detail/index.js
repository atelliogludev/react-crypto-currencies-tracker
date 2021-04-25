import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import getCandles from "../../../services/detail/getCandles";
import moment from "moment";
import getRateDetail from "../../../services/detail/getRateDetail";
import RateData from "../../elements/ratedata";
import styles from "./detail.module.css";

export default function DetailPage(props) {
  let options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "candlestick",
      height: 350,
    },

    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const fetchData = (interval, startDate, endDate) => {
    getCandles(props.match.params.id, interval, startDate, endDate)
      .then((data) => {
        setSeriesData([...data]);
      })
      .then(() => setIsFetched(true));
  };

  const [isFetched, setIsFetched] = useState(false);
  const [seriesData, setSeriesData] = useState([]);
  const [rateData, setRateData] = useState(null);

  const onClickTimeButton = (ago) => {
    const [interval, startDate] = calculateDate(ago);
    const endDate = moment();
    fetchData(interval, startDate.valueOf(), endDate.valueOf());
  };

  useEffect(() => {
    onClickTimeButton("1d");
    getRateDetail(props.match.params.id).then((data) => setRateData(data));
  }, []);

  const calculateDate = (ago) => {
    let date = moment();
    let interval = "m15";
    if (ago === "1d") {
      date.subtract(1, "days");
    } else if (ago === "1w") {
      interval = "h2";
      date.subtract(1, "weeks");
    } else if (ago === "1m") {
      interval = "h8";
      date.subtract(1, "months");
    } else if (ago === "3m") {
      interval = "d1";
      date.subtract(3, "months");
    } else if (ago === "6m") {
      interval = "d1";
      date.subtract(6, "months");
    } else if (ago === "1y") {
      interval = "d1";
      date.subtract(1, "years");
    }
    return [interval, date];
  };

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detailBackgroundWrapper}>
      {rateData !== null && <RateData rateData={rateData} />}
      </div>
      <div className={styles.detailTableWrapper} >
        

        {isFetched && (
          <div className={styles.rateChart} >
            <ReactApexChart
              options={options}
              series={[{ data: seriesData }]}
              type="candlestick"
              height={400}
              
            />
          </div>
        ) }
        
      </div>
      <div className={styles.buttonWrapper}>
          <button onClick={() => onClickTimeButton("1d")}>1D</button>
          <button onClick={() => onClickTimeButton("1w")}>1W</button>
          <button onClick={() => onClickTimeButton("1m")}>1M</button>
          <button onClick={() => onClickTimeButton("3m")}>3M</button>
          <button onClick={() => onClickTimeButton("6m")}>6M</button>
          <button onClick={() => onClickTimeButton("1y")}>1Y</button>
        </div>
    </div>
  );
}

