import { configureStore } from '@reduxjs/toolkit'; // Remove getDefaultMiddleware import
// import { getDefaultMiddleware } from '@reduxjs/toolkit'; // Removed unused import
import cartReducer from './reducers/CartSlice';
import wishlistReducer from './reducers/WishSlice';
import storage from 'redux-persist/lib/storage'; // default is localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Ensure this is the correct import

// Persist Config
// This configuration is used to persist the Redux store
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
// This is a utility function that combines multiple reducers into a single reducer function
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  
});

// Create a new reducer that persists the state of the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
// This is the Redux store that holds the complete state tree of the application
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Use a callback for middleware
});

// Persistor for the store
// This is a persistor that can be used to persist and rehydrate the Redux store
export const persistor = persistStore(store);
