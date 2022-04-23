import { configureStore } from "@reduxjs/toolkit";
import auth from "./AuthSlice";
import books from './BooksSlice';
import authors from './AuthorSlice';
import reviews from './ReviewsSlice';
import genres from './GenresSlice';
import suggestions from './SuggestionsSlice';
import feedbacks from './FeedbackSlice';
import profile from './ProfileSlice';

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
        genres,
        suggestions,
        feedbacks,
        profile
    },
});