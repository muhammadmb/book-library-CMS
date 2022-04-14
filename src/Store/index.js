import { configureStore } from "@reduxjs/toolkit";
import auth from "./AuthSlice";
import books from './BooksSlice';
import authors from './AuthorSlice';
import reviews from './ReviewsSlice';
import genres from './GenresSlice';

export default configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    reducer: {
        auth,
        books,
        authors,
        reviews,
        genres
    },
});