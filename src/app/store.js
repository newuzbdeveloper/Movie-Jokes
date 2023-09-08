import { configureStore } from "@reduxjs/toolkit";
import aiJokesReducer from "src/features/ai-jokes/aiJokesSlice";
import { moviesApi } from "src/features/movies/moviesApi";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    aiJokes: aiJokesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});
