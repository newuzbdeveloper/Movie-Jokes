import { createSlice } from "@reduxjs/toolkit";
import { data } from "./data";

const moviesSlice = createSlice({
  name: "movies",
  initialState: data.results,
  reducers: {},
});

export const selectedMovies = (state) => state.movies;
export const selectedMovieId = (state, movieId) =>
  state.movies.find((movie) => movie.id === Number(movieId));
export default moviesSlice.reducer;
