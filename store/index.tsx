import articlesSlice from '@/store/articlesSlice';
import themeConfigSlice from '@/store/themeConfigSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  articles: articlesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
