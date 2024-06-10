import { createSlice } from "@reduxjs/toolkit";

const accomodationSlice = createSlice({
  name: "accomodation",
  initialState: {
    accomodation: [],
    loading: false,
    errors: null,
  },
  reducers: {
    //for updating slice states
    getAccomodationRequest(state) {
      state.loading = true; //to say fetching data is in progress
    },
    getAccomodation(state, action) {
      state.accomodation = action.payload;
      state.loading = false; //data fetching is completed
    },
    getErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const accomodationActions = accomodationSlice.actions;
export default accomodationSlice;
