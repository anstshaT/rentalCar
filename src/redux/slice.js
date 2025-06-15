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
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    reservations: JSON.parse(localStorage.getItem("reservations")) || [],
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
        (car) => car.id !== action.payload.id
      );
    },
    addReservation(state, action) {
      const { carId, bookingDate } = action.payload;

      const isCarReserved = state.reservations.some(
        (reserv) => reserv.carId === carId && reserv.bookingDate === bookingDate
      );

      if (isCarReserved) {
        throw new Error("Car is not avaible on this day");
      }

      state.reservations.push(action.payload);
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
        if (action.meta.arg.page > 1) {
          state.cars = [...state.cars, ...action.payload.cars];
        } else {
          state.cars = action.payload.cars;
        }
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

export const { setFilters, addFavorite, remoteFavorite, addReservation } =
  totalSlice.actions;
export const totalReducer = totalSlice.reducer;
