import { createAction } from "@reduxjs/toolkit"
import { playerFetched,  playerFetching,  playersFetchingError } from "../slices/players-slice"
import { filtersFetched, filtersFetching, filtersFetchingError } from "../slices/filters-slice"
export const fetchPlayers = (request) => (dispatch) =>{
    dispatch(playerFetching())
        request("http://localhost:3000/players")
        .then(res => dispatch(playerFetched(res)))
        .catch(() => dispatch(playersFetchingError()))  
}
export const fetchFilters = (request) => (dispatch) =>{
    dispatch(filtersFetching());
    request("http://localhost:3000/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => filtersFetchingError());
}