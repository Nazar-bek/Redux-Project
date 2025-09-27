import { createReducer } from "@reduxjs/toolkit";
import { playerDeleted, playerFetched, playerFetching, playersCreated, playersFetchingError } from "../actions";

const initialState = {
  players: [],
  playersLoadingStatus: "success",
};
const players = createReducer(initialState, builder => {
  builder
    .addCase(playerFetching, (state) => {
      state.playersLoadingStatus = "loading"
    })
    .addCase(playerFetched, (state, action) => {
       state.players = action.payload,
       state.playersLoadingStatus = "success"
    })
    .addCase(playersFetchingError, (state) =>{
      state.playersLoadingStatus = "error"
    })
    .addCase(playersCreated, (state, action) => {
      state.players.push(action.payload)
    })
    .addCase(playerDeleted, (state, action) => {
      state.players = state.players.filter((item) => item.id !== action.payload)
    })
    .addDefaultCase(() => {})
})
export default players;
