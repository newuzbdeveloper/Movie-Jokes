import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { MOVIEDB_API_URL } from "src/common/constants";

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
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
    }),
    getMoviesById: builder.query({
      query: (movieId) => `/movie/${movieId}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMoviesById } = moviesAPI;
