import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cohort } from '../../lib/types';
import apiRequest from '../../lib/apiRequest';

export const fetchCohorts = createAsyncThunk(
  'cohorts/fetchCohorts',
  async () => {
    const response = await apiRequest.get('/cohort');
    return response.data;
  }
);

export const createCohort = createAsyncThunk(
  'cohorts/createCohort',
  async (name: string) => {
    const response = await apiRequest.post('/cohort', { name });
    return response.data;
  }
);

const cohortSlice = createSlice({
  name: 'cohorts',
  initialState: {
    items: [] as Cohort[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCohorts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCohorts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCohorts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default cohortSlice.reducer;