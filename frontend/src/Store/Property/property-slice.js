import { createSlice } from "@reduxjs/toolkit"; //provides tools for uses

//using createSlice
const propertySlice = createSlice({
  //Slice name
  name: "property",
  //Initial State forproperty slice
  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {}, //parameters used for searching
    error: null, //Error state
    loading: false, //loading state for the property
  },
  //Reducers Function to handle different objects
  reducers: {
    getRequest(state) {
      state.loading = true;
    },
    //For action to update properties state with fetch data
    getProperties(state, action) {
      //stores an array type of thing which we will get from the backend or api.
      state.properties = action.payload.data; //update the properties field of your state
      state.totalProperties = action.payload.all_properties; //and assign the value of payload of data to state.properties
      state.loading = false; //resposible for updating the state in the redux state
    },

    //Sction to update search parameter
    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
              ...state.searchParams,
              ...action.payload,
            };
    },

    //Action to updateerror state
    getErrors(state, action) {
      state.error = action.payload;
    },
  },
});

export const propertyAction = propertySlice.actions;
export default propertySlice;
