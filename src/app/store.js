import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "src/features/movies/movieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
