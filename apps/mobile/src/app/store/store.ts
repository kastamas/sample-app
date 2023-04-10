import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../modules/auth/auth.branch';
import { posSlice } from '../modules/pos/pos.branch';
import { locationSlice } from '../modules/location/location.branch';
import { codeCheckSlice } from '../modules/auth/code-check.branch';
import { configSlice } from '../modules/config/config.branch';
import { citiesSlice } from '../modules/cities/cities.branch';
import { promosSlice } from '../modules/promos/promos.branch';
import { posSelectionReducer } from '../modules/pos/pos.store';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [posSlice.name]: posSlice.reducer,
    [locationSlice.name]: locationSlice.reducer,
    [codeCheckSlice.name]: codeCheckSlice.reducer,
    [configSlice.name]: configSlice.reducer,
    [citiesSlice.name]: citiesSlice.reducer,
    [promosSlice.name]: promosSlice.reducer,
    posSelection: posSelectionReducer,
  },
});
