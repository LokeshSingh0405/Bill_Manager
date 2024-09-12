import { configureStore } from '@reduxjs/toolkit';
import billsReducer from "./Slice/billSlice";

export default configureStore({
  reducer: {
    bills: billsReducer,
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})