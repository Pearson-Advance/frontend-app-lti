/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from 'features/constants';

const initialState = {
  table: {
    data: [],
    status: RequestStatus.INITIAL,
    error: null,
    numPages: 0,
    count: 0,
  },
  classesTable: {
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
    updateCoursesDataRequest: (state) => {
      state.table.status = RequestStatus.LOADING;
    },
    updateCoursesDataSuccess: (state, { payload }) => {
      const { results, count, numPages } = payload;
      state.table.status = RequestStatus.SUCCESS;
      state.table.data = results;
      state.table.numPages = numPages;
      state.table.count = count;
    },
    updateCoursesDataFailed: (state) => {
      state.table.status = RequestStatus.ERROR;
    },
    updateCourseClassesDataRequest: (state) => {
      state.classesTable.status = RequestStatus.LOADING;
    },
    updateCourseClassesDataSuccess: (state, { payload }) => {
      const { results, count, numPages } = payload;
      state.classesTable.status = RequestStatus.SUCCESS;
      state.classesTable.data = results;
      state.classesTable.numPages = numPages;
      state.classesTable.count = count;
    },
    updateCourseClassesDataFailed: (state) => {
      state.classesTable.status = RequestStatus.ERROR;
    },
    resetCourseClassesData: (state) => {
      state.classesTable = initialState.classesTable;
    },
  },
});

export const {
  updateCoursesDataRequest,
  updateCoursesDataSuccess,
  updateCoursesDataFailed,
  updateCourseClassesDataRequest,
  updateCourseClassesDataSuccess,
  updateCourseClassesDataFailed,
  resetCourseClassesData,
} = coursesSlice.actions;

export const { reducer } = coursesSlice;
