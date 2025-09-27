import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  playersLoadingStatus: "success",
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    playerFetching: (state) => {
      state.playersLoadingStatus = "loading"},
    playerFetched: (state, action) => {
       state.players = action.payload,
       state.playersLoadingStatus = "success"
    },
    playersFetchingError: (state) => {
      state.playersLoadingStatus = "error"
    },
    playersCreated: (state, action) => {
        state.players.push(action.payload)
    },
    playerDeleted: (state, action) =>{
      state.players = state.players.filter((item) => item.id !== action.payload)
    }
  },
});


const {reducer, actions} = playerSlice
export default reducer
export const {playerDeleted,playerFetched,playerFetching,playersCreated,playersFetchingError} = actions

