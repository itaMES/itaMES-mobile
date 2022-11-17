import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@redux/reducers';

const errorSelector = (state: RootState) => state.error;

const errorInfo = createSelector(errorSelector, errorState => errorState.error);

export { errorInfo };
