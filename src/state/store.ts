import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import articleReducer from "./Article/ArticleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
