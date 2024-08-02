import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ListItem } from "../ListItem/ListItem";

import styles from "./RealtimeList.module.css";

export const RealtimeList = memo(() => {
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);

  return (
    <ul className={styles.list}>
      {Object.keys(cryptos).map((symbol) => (
        <ListItem symbol={symbol} price={cryptos[symbol]} key={symbol} />
      ))}
    </ul>
  );
});
