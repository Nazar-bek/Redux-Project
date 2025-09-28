import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useHttp";

const initialState = {
  players: [],
  playersLoadingStatus: "success",
};

export const fetchPlayers = createAsyncThunk("players", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3000/players");
});

const playerSlice = createSlice({
  name: "players/fetchPlayers",
  initialState,
  reducers: {
    playersCreated: (state, action) => {
      state.players.push(action.payload);
    },
    playerDeleted: (state, action) => {
      state.players = state.players.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.playersLoadingStatus = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        (state.players = action.payload),
          (state.playersLoadingStatus = "success");
      })
      .addCase(fetchPlayers.rejected, state => {
        state.playersLoadingStatus = "error"
      })
      .addDefaultCase(() => {})
  },
});

const { reducer, actions } = playerSlice;
export default reducer;
export const {
  playerDeleted,
  playerFetched,
  playerFetching,
  playersCreated,
  playersFetchingError,
} = actions;
