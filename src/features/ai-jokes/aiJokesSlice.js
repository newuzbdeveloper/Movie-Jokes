import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OPENAI_API_URL } from "src/common/constants";

const initialState = {
  rules: [
    {
      name: "Joke Type",
      description: "Programmer",
    },
  ],
  jokes: {
    jokes: [],
    status: "idle",
    error: null,
  },
};

export const fetchJoke = createAsyncThunk(
  "aiJokes/fetchJoke",
  async ({ movieId, movieTitle, movieDescription }, thunkApi) => {
    const state = thunkApi.getState();
    const joke = selectedJokeById(state, movieId);
    const rules = selectJokeRules(state);
    const rulesParams = rules.reduce(
      (acc, rule) => `${acc}${rule.name}: ${rule.description}\n`,
      ""
    );

    const messages = [
      {
        role: "user",
        content: `Movie Title: ${movieTitle}, Movie Descreption: ${movieDescription}, ${rulesParams} Joke:`,
      },
    ];

    if (joke) {
      messages.unshift({
        role: "user",
        content: `Don't use joke: ${joke.joke}`,
      });
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        messages,
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    return { movieId, joke: response.data.choices[0].message.content };
  }
);

const aiJokesSlice = createSlice({
  name: "aiJokes",
  initialState,
  reducers: {
    ruleAdded(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => action.payload.name === rule.name
      );
      if (ruleIndex >= 0) return;
      state.rules.push(action.payload);
    },
    ruleRemoved(state, action) {
      const ruleIndex = state.rules.findIndex(
        (rule) => action.payload === rule.name
      );
      if (ruleIndex < 0) return;
      state.rules.splice(ruleIndex, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.jokes.status = "loading";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.jokes.status = "succeeded";
        const jokeIndex = state.jokes.jokes.findIndex(
          (joke) => joke.movieId === action.payload.movieId
        );
        if (jokeIndex > -1) {
          state.jokes.jokes[jokeIndex] = action.payload;
        } else {
          state.jokes.jokes.push(action.payload);
        }
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.jokes.status = "failed";
        state.jokes.error = action.error.message;
      });
  },
});

export const { ruleAdded, ruleRemoved } = aiJokesSlice.actions;
export const selectJokeStatus = (state) => state.aiJokes.jokes.status;
export const selectedJokeById = (state, movieId) =>
  state.aiJokes.jokes.jokes.find((joke) => joke.movieId === movieId);
export const selectJokeRules = (state) => state.aiJokes.rules;
export default aiJokesSlice.reducer;
