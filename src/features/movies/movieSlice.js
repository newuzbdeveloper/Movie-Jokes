import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./api";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await fetchPopularMovies();
  return data.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectedMovies = (state) => state.movies.movies;
export const selectedMoviesStatus = (state) => state.movies.status;
export const selectedMoviesError = (state) => state.movies.error;
export const selectedMovieId = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === Number(movieId));
export default moviesSlice.reducer;
