import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@entities/game/model/gameSlice.jsx";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
