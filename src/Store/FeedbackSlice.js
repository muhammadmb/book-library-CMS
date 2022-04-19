import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    feedbacks: [],
    errors: null,
    headers: "",
    status: "",
    feedbackLoading: false,
    feedbackDeleting: false,
    feedbackUpdating: false
}

export const getFeedbacks = createAsyncThunk(
    "feedbacks/getFeedbacks",
    async (feedbacksData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }

        const { pageNumber, pageSize, searchQuery } = feedbacksData;

        try {
            const Feedbacks = await axios.get(`${API_URL}/Feedback?${searchQuery ? `SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                }).catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return Feedbacks;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editFeedback = createAsyncThunk(
    "feedbacks/editFeedback",
    async (feedbackData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        const { id, path, value } = feedbackData;
        try {
            const Feedbacks = await axios.patch(`${API_URL}/Feedback/${id}`,
                [
                    {
                        "op": "replace",
                        "path": `/${path}`,
                        "value": value
                    }
                ],
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                }).catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return Feedbacks;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    "feedbacks/deleteFeedback",
    async (id, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const Feedbacks = await axios.delete(`${API_URL}/Feedback/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
                    }
                }).catch(
                    function (error) {
                        if (error.response) {
                            return (error.response)
                        } else if (error.request) {
                            return (error.request)
                        } else {
                            return (error.message)
                        }
                    });
            return Feedbacks;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const FeedbackSlice = createSlice({
    name: "feedbacks",
    initialState,
    reducers: {},
    extraReducers: {
        [getFeedbacks.pending]: (state, action) => {
            state.errors = null;
            state.feedbackLoading = true;
        },
        [getFeedbacks.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.feedbacks = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.feedbackLoading = false;
        },
        [getFeedbacks.rejected]: (state, action) => {
            state.feedbackLoading = false;
            state.feedbackDeleting = false;
            state.feedbackUpdating = false;
            state.errors = action.payload;
        },

        [editFeedback.pending]: (state, action) => {
            state.feedbackLoading = false;
            state.feedbackDeleting = false;
            state.feedbackUpdating = true;
        },
        [editFeedback.fulfilled]: (state, action) => {
            if (action.payload.status === 201) {
                state.status = action.payload.status;
            }
            state.feedbackUpdating = false;
        },
        [editFeedback.rejected]: (state, action) => {
            state.feedbackLoading = false;
            state.feedbackDeleting = false;
            state.feedbackUpdating = false;
            state.errors = action.payload;
        },

        [deleteFeedback.pending]: (state, action) => {
            state.feedbackLoading = false;
            state.feedbackDeleting = true;
            state.feedbackUpdating = false;
        },
        [deleteFeedback.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.errors = null;
                state.feedbacks = state.feedbacks.filter((f) => f.id !== action.meta?.arg);
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.feedbackDeleting = false;
        },
        [deleteFeedback.rejected]: (state, action) => {
            state.feedbackLoading = false;
            state.feedbackDeleting = false;
            state.feedbackUpdating = false;
            state.errors = action.payload;
        },
    }
});

export default FeedbackSlice.reducer;