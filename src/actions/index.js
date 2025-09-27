import { createAction } from "@reduxjs/toolkit"
export const fetchPlayers = (request) => (dispatch) =>{
    dispatch(playerFetching())
        request("http://localhost:3000/players")
        .then(res => dispatch(playerFetched(res)))
        .catch(() => dispatch(playersFetchingError()))  
}
export const playerFetching = createAction("PLAYERS_FETCHING")
export const playerFetched = createAction("PLAYERS_FETCHED")
export const playersFetchingError = createAction("PLAYERS_FETCHING_ERROR")
export const playersCreated = createAction("PLAYER_CREATED")
export const playerDeleted = createAction("PLAYER_DELETED")
export const filtersFetching = createAction("FILTERS_FETCHING")
export const filtersFetched = createAction("FILTERS_FETCHED")
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR")
export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED")
export const fetchFilters = (request) => (dispatch) =>{
    dispatch(filtersFetching());
    request("http://localhost:3000/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => filtersFetchingError());
}

