import { combineReducers } from '@reduxjs/toolkit';
import client from './clientSlice';

const reducer = combineReducers({
  client,
});

export default reducer;
