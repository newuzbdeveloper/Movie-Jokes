import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MOVIEDB_API_URL } from "src/common/constants";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: MOVIEDB_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => "/movie/popular",
      transformResponse: (response) => response.results,
      transformErrorResponse: (error) =>
        error?.data.status_message ?? "Somesthing went wrong!",
    }),
    getMoviesById: builder.query({
      query: (movieId) => `/movie/${movieId}`,
      transformErrorResponse: (error) =>
        error?.data.status_message ?? "Somesthing went wrong!",
    }),
  }),
});

export const { useGetMoviesQuery, useGetMoviesByIdQuery } = moviesApi;
