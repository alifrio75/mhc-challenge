import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './user.slice';

export default configureStore({
  reducer: {
    user: counterReducer,
  },
});
