import ReconnectingWebSocket from "reconnecting-websocket";
import { store } from "./store";
import {
  setPrice,
  setConnected,
  setError,
} from "../features/crypto/cryptoSlice";
import { COINBASE_PRODUCTS } from "../utils/coinbaseProducts";

enum CHANNEL {
  Ticker = "ticker",
}

interface CryptoPriceData {
  best_ask: string;
  best_ask_size: string;
  best_bid: string;
  best_bid_size: string;
  high_24h: string;
  last_size: string;
  low_24h: string;
  open_24h: string;
  price: string;
  product_id: string;
  sequence: number;
  side: string;
  time: string;
  trade_id: number;
  type: CHANNEL;
}

export const subscribe = (productIds: string[]) =>
  JSON.stringify({
    type: "subscribe",
    channels: [
      {
        name: CHANNEL.Ticker,
        product_ids: productIds,
      },
    ],
  });

export const unsubscribe = (productIds: string[]) =>
  JSON.stringify({
    type: "unsubscribe",
    channels: [
      {
        name: CHANNEL.Ticker,
        product_ids: productIds,
      },
    ],
  });

export const ws = new ReconnectingWebSocket(
  import.meta.env.VITE_COINBASE_WS_URL
);

ws.onopen = () => {
  const productIds = COINBASE_PRODUCTS.map((product) => product.id);
  ws.send(subscribe(productIds));

  store.dispatch(setConnected(true));
};

ws.onmessage = (event) => {
  const data: CryptoPriceData = JSON.parse(event.data);

  if (data.type === CHANNEL.Ticker) {
    const { product_id, price } = data;
    store.dispatch(setPrice({ symbol: product_id, price }));
  }
};

ws.onerror = () => {
  store.dispatch(setError("WebSocket error"));
};

ws.onclose = () => {
  store.dispatch(setConnected(false));
};
