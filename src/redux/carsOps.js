import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, filters }, thunkAPI) => {
    try {
      const params = { limit: 12, page };
      if (filters.brand) params.brand = filters.brand;
      if (filters.rentalPrice) params.rentalPrice = filters.rentalPrice;
      if (filters.minMileage) params.minMileage = filters.minMileage;
      if (filters.maxMileage) params.maxMileage = filters.maxMileage;

      const { data } = await axios.get("/cars", {
        params,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
