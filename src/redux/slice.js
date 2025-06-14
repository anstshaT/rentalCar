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
    cars: [],
    totalCars: 0,
    page: 1,
    totalPages: 1,
    currentCar: {},
    filter: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    addFavorite(state, action) {
      if (!state.favorites.find((car) => car.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    remoteFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (car) => car.id === action.payload.id
      );
    },
  },
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
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, handleRejected)
      /* car by id */
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentCar = action.payload;
        state.totalCars = action.payload.totalCars;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      });
  },
});

export const { setFilters, addFavorite, remoteFavorite } = totalSlice.actions;
export const totalReducer = totalSlice.reducer;
