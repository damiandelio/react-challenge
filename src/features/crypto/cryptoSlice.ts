import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CryptoState {
  cryptos: { [symbol: string]: string };
  connected: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  cryptos: {},
  connected: false,
  error: null,
};

interface SetPricePayload {
  symbol: string;
  price: string;
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setPrice(state, action: PayloadAction<SetPricePayload>) {
      const { symbol, price } = action.payload;
      state.cryptos[symbol] = price;
    },

    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // Adds or removes cryptos
    conciliateSubscriptions(state, action: PayloadAction<string[]>) {
      const productIds = action.payload;
      const cryptosCopy = state.cryptos;
      state.cryptos = {};

      productIds.forEach((productId) => {
        state.cryptos[productId] = cryptosCopy[productId] ?? "";
      });
    },
  },
});

export const { setPrice, setConnected, setError, conciliateSubscriptions } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
