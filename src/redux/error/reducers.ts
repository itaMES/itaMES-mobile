import { createReducer } from '@reduxjs/toolkit';
import { ErrorResponse } from '@utils/types';
import { addError, removeError } from './actions';

export interface IErrorState {
  error: ErrorResponse | null;
}

const initialState: IErrorState = {
  error: null,
};

export const errorReducer = createReducer(initialState, {
  [addError.type]: (state, action) => {
    state.error = action.payload;
  },
  [removeError.type]: state => {
    state.error = null;
  },
});
