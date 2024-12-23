import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Student } from '../../lib/types';
import apiRequest from '../../lib/apiRequest';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async ({ cohortId, courseId }: { cohortId: string; courseId?: string }) => {
    const response = await apiRequest.get(
      `/student/${cohortId}${courseId ? `?courseId=${courseId}` : ''}`
    );
    return response.data;
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async ({ name, cohortId, courses }: { name: string; cohortId: string; courses: string[] }) => {
    const response = await apiRequest.post('/student', { name, cohortId, courses });
    return response.data;
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    items: [] as Student[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default studentSlice.reducer;