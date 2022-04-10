import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    reviews: [],
    errors: null,
    headers: "",
    reviewsLoading: false,
    reviewDeleting: false
}

export const getReviews = createAsyncThunk(
    "reviews/getReviews",
    async (reviewsData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { genreId, bookId, fields, pageNumber, pageSize } = reviewsData;
        try {
            const review = await axios.get(
                `${API_URL}/Genres/${genreId}/Books/${bookId}/reviews?${fields ? `fields=${fields}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}`
            ).catch(
                function (error) {
                    if (error.response) {
                        return (error.response)
                    } else if (error.request) {
                        return (error.request)
                    } else {
                        return (error.message)
                    }
                });
            return review;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteReviews = createAsyncThunk(
    "reviews/deleteReviews",
    async (reviewsData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { genreId, bookId, reviewId } = reviewsData;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const reviews = await axios.delete(`${API_URL}/Genres/${genreId}/Books/${bookId}/reviews/${reviewId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                })
                .catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return reviews;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ReviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: {
        [getReviews.pending]: (state, action) => {
            state.errors = null;
            state.reviewsLoading = true;
        },
        [getReviews.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.reviews = action.payload.data;
                state.headers = action.payload.headers;
            }
            state.errors = action.payload?.errors;
            state.reviewsLoading = false;
        },
        [getReviews.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteReviews.pending]: (state, action) => {
            state.errors = null;
            state.reviewDeleting = true;
        },
        [deleteReviews.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.reviews = state.reviews.filter((r) => r.id !== action.meta?.arg?.reviewId);
                state.reviewDeleting = false;
            }
        },
        [deleteReviews.rejected]: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export default ReviewsSlice.reducer;