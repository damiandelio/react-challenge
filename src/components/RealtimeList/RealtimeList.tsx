import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ListItem } from "../ListItem/ListItem";

export const RealtimeList = memo(() => {
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);

  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.5rem",
        padding: "3rem 0",
        maxWidth: "60rem",
        margin: "auto",
      }}
    >
      {Object.keys(cryptos).map((symbol) => (
        <ListItem symbol={symbol} price={cryptos[symbol]} key={symbol} />
      ))}
    </ul>
  );
});
