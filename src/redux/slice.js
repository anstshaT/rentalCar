import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./brandsOps";
import { fetchCarById, fetchCars } from "./carsOps";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const totalSlice = createSlice({
  name: "cars",
  initialState: {
    brands: [],
    cars: {},
    currentCar: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* brands */
      .addCase(fetchBrands.pending, handlePending)
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, handleRejected)
      /* all cars */
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, handleRejected)
      /* car by id */
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentCar = action.payload;
      });
  },
});

export const totalReducer = totalSlice.reducer;
