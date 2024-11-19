/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/constants';

const initialState = {
  table: {
    currentPage: 1,
    data: [],
    status: RequestStatus.INITIAL,
    error: null,
    numPages: 0,
    count: 0,
  },
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchCoursesDataRequest: (state) => {
      state.table.status = RequestStatus.LOADING;
    },
    fetchCoursesDataSuccess: (state, { payload }) => {
      const { results, count, numPages } = payload;
      state.table.status = RequestStatus.SUCCESS;
      state.table.data = results;
      state.table.numPages = numPages;
      state.table.count = count;
    },
    fetchCoursesDataFailed: (state) => {
      state.table.status = RequestStatus.ERROR;
    },
  },
});

export const { fetchCoursesDataRequest, fetchCoursesDataSuccess, fetchCoursesDataFailed } = coursesSlice.actions;

export const { reducer } = coursesSlice;
