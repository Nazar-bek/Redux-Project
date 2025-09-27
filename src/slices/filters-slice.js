import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  filtersLoadingStatus: "success",
  activeFilter: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      (state.filters = action.payload),
        (state.filtersLoadingStatus = "success");
    },
    filtersFetchingError: (state) => {
      state.activeFilter = "error";
    },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const {reducer, actions} = filterSlice
export default reducer
export const {filtersFetched,filtersFetching,filtersFetchingError,activeFilterChanged} = actions