import { configureStore } from '@reduxjs/toolkit';
import cohortReducer from './slices/cohortSlice';
import courseReducer from './slices/courseSlice';
import studentReducer from './slices/studentSlice';

export const store = configureStore({
  reducer: {
    cohorts: cohortReducer,
    courses: courseReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;