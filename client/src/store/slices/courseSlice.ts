import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../../lib/types';
import apiRequest from '../../lib/apiRequest';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (cohortId: string) => {
    const response = await apiRequest.get(`/course/${cohortId}`);
    return response.data;
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ name, cohortId }: { name: string; cohortId: string }) => {
    const response = await apiRequest.post('/course', { name, cohortId });
    return response.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [] as Course[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default courseSlice.reducer;