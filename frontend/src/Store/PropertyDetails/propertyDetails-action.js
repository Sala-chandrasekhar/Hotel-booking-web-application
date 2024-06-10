import axios from "axios";
//formaking http requests
import { propertyDetailsAction } from "./propertyDetails-slice";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axios(`/api/v1/rent/listing/${id}`);
    if (!response) {
      throw new Error("Property Not Found");
    }
    const { data } = response.data;
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction.getErrors(error.message));
  }
};
