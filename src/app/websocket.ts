import ReconnectingWebSocket from "reconnecting-websocket";
import { store } from "./store";
import {
  setPrice,
  setConnected,
  setError,
  conciliateSubscriptions,
} from "../features/crypto/cryptoSlice";
import { COINBASE_PRODUCT_LIST } from "../utils/coinbaseProducts";

enum MESSAGE_TYPE {
  Ticker = "ticker",
  Subscriptions = "subscriptions",
}

interface MessageData {
  type: MESSAGE_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const subscribe = (productIds: string[]) =>
  JSON.stringify({
    type: "subscribe",
    channels: [
      {
        name: MESSAGE_TYPE.Ticker,
        product_ids: productIds,
      },
    ],
  });

export const unsubscribe = (productIds: string[]) =>
  JSON.stringify({
    type: "unsubscribe",
    channels: [
      {
        name: MESSAGE_TYPE.Ticker,
        product_ids: productIds,
      },
    ],
  });

export const ws = new ReconnectingWebSocket(
  import.meta.env.VITE_COINBASE_WS_URL
);

ws.onopen = () => {
  ws.send(subscribe(COINBASE_PRODUCT_LIST));
  store.dispatch(setConnected(true));
};

ws.onmessage = (event) => {
  const data: MessageData = JSON.parse(event.data);

  switch (data.type) {
    case MESSAGE_TYPE.Ticker: {
      const { product_id, price } = data;
      store.dispatch(setPrice({ symbol: product_id, price }));
      break;
    }

    case MESSAGE_TYPE.Subscriptions: {
      if (data.channels?.length === 0) {
        // Unsubscribe all
        store.dispatch(conciliateSubscriptions([]));
      } else {
        const subscription = data.channels?.find(
          ({ name }: { name: string }) => name === MESSAGE_TYPE.Ticker
        );

        if (Array.isArray(subscription?.product_ids)) {
          store.dispatch(conciliateSubscriptions(subscription.product_ids));
        }
      }

      break;
    }
  }
};

ws.onerror = () => {
  store.dispatch(setError("WebSocket error"));
};

ws.onclose = () => {
  store.dispatch(setConnected(false));
};
