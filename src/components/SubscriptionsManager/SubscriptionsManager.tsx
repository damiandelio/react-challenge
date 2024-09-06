import { memo } from "react";
import { useSelector } from "react-redux";
import { subscribe, unsubscribe, ws } from "../../app/websocket";
import type { RootState } from "../../app/store";
import { COINBASE_PRODUCT_LIST } from "../../utils/coinbaseProducts";

import styles from "./SubscriptionsManager.module.css";

export const SubscriptionsManager = memo(() => {
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);
  const allCryptos = Object.keys(cryptos);

  const handleUnsubscribeAll = () => {
    ws.send(unsubscribe(allCryptos));
  };

  const handleSubscribeAll = () => {
    ws.send(subscribe(COINBASE_PRODUCT_LIST));
  };

  return (
    <div className={styles.subscriptionsManager}>
      <ul className={styles.list}>
        {COINBASE_PRODUCT_LIST.map((symbol) => {
          const subscribed: boolean = cryptos[symbol] !== undefined;

          return (
            <Bullet subscribed={subscribed} symbol={symbol} key={symbol} />
          );
        })}
      </ul>

      {allCryptos.length ? (
        <button className={styles.button} onClick={handleUnsubscribeAll}>
          Unsuscribe all
        </button>
      ) : (
        <button className={styles.button} onClick={handleSubscribeAll}>
          Suscribe all
        </button>
      )}
    </div>
  );
});

interface BulletProps {
  subscribed: boolean;
  symbol: string;
}

const Bullet = memo(({ subscribed, symbol }: BulletProps) => {
  const handleChange = () => {
    if (subscribed) {
      ws.send(unsubscribe([symbol]));
    } else {
      ws.send(subscribe([symbol]));
    }
  };

  return (
    <li className={styles.bullet}>
      <label
        style={{
          background: subscribed
            ? "rgba(0, 255, 0, 0.5)"
            : "rgba(255, 0, 0, 0.75)",
        }}
      >
        {symbol.replace("-USD", "")}
        <input
          type="checkbox"
          name={symbol}
          checked={subscribed}
          onChange={handleChange}
        />
      </label>
    </li>
  );
});
