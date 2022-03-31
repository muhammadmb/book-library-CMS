import { configureStore } from "@reduxjs/toolkit";
import auth from "./AuthSlice";
import books from './BooksSlice';

export default configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    reducer: {
        auth,
        books
    },
});