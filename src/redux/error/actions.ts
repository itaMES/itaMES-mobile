import { createAction } from '@reduxjs/toolkit';
import { ErrorResponse } from '@utils/types';

const addError = createAction<ErrorResponse>('ADD_ERROR');
const removeError = createAction('REMOVE_ERROR');
const removeErrorRequest = createAction('REMOVE_ERROR_REQUEST');

export { addError, removeError, removeErrorRequest };
