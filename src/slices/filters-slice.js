import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useHttp";

const initialState = {
  filters: [],
  filtersLoadingStatus: "success",
  activeFilter: "All",
};


export const fetchFilters = createAsyncThunk(
  "filter/fetchFilters",
 async () => {
  const {request} = useHttp()
  return await request("http://localhost:3000/filters")
  }
)

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(fetchFilters.pending, state => {
      state.filtersLoadingStatus = "loading"
    })
    .addCase(fetchFilters.fulfilled, (state, action) =>{
      (state.filters = action.payload),
        (state.filtersLoadingStatus = "success");
    })
    .addCase(fetchFilters.rejected, state => {
      state.filtersLoadingStatus = "error"
    })
    .addDefaultCase(() => {})
  }
});

const {reducer, actions} = filterSlice
export default reducer
export const {filtersFetched,filtersFetching,filtersFetchingError,activeFilterChanged} = actions