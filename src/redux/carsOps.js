import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page, brand, rentalPrice, minMileage, maxMileage }, thunkAPI) => {
    try {
      const { data } = await axios.get("/cars", {
        params: {
          brand: brand,
          rentalPrice: rentalPrice,
          minMileage: minMileage,
          maxMileage: maxMileage,
          limit: 12,
          page: page,
        },
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
