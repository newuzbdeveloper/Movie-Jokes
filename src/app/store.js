import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import aiJokesReducer from "src/features/ai-jokes/aiJokesSlice";
import { moviesAPI } from "src/features/movies/movieSlice";

export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    aiJokes: aiJokesReducer,
  },
  middleware: new MiddlewareArray().concat(moviesAPI.middleware),
});
