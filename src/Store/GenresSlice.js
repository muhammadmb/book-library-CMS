import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    genres: [],
    errors: null,
    headers: "",
    status: "",
    genreLoading: false,
    genreAdding: false,
    genreDeleting: false,
    genreUpdating: false
}

export const getGenres = createAsyncThunk(
    "genres/getGenres",
    async (genreData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { pageNumber, pageSize, searchQuery } = genreData;
        try {
            const genres = await axios.get(`${API_URL}/Genres?${searchQuery ? `SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}`)
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
            return genres;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertGenre = createAsyncThunk(
    "genres/insertGenre",
    async (genreData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const genre = await axios.post(`${API_URL}/Genres`,
                genreData,
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
            return genre;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editGenre = createAsyncThunk(
    "genres/editGenres",
    async (genreData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const genre = await axios.put(`${API_URL}/Genres/${genreData.genreId}`,
                genreData,
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
            return genre;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteGenre = createAsyncThunk(
    "genres/deleteGenres",
    async (genreData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const genre = await axios.delete(`${API_URL}/Genres/${genreData.genreId}`,
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
            return genre;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const GenresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: {
        [getGenres.pending]: (state, action) => {
            state.errors = null;
            state.genreLoading = true;
        },
        [getGenres.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.genres = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.genreLoading = false;
        },
        [getGenres.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [insertGenre.pending]: (state, action) => {
            state.genreAdding = true;
            state.errors = null;
        },
        [insertGenre.fulfilled]: (state, action) => {
            if (action.payload.status === 201) {
                state.status = action.payload.status;
                state.errors = null;
            }
            state.errors = action.payload?.data?.errors;
            state.genreAdding = false;
        },
        [insertGenre.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [editGenre.pending]: (state, action) => {
            state.genreUpdating = true;
            state.errors = null;
        },
        [editGenre.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.errors = null;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.genreUpdating = false;
        },
        [editGenre.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteGenre.pending]: (state, action) => {
            state.genreDeleting = true;
            state.errors = null;
        },
        [deleteGenre.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.errors = null;
                state.genres = state.genres.filter((g) => g.id !== action.meta?.arg?.genreId);
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.genreDeleting = false;
        },
        [deleteGenre.rejected]: (state, action) => {
            state.errors = action.payload;
        }
    }
});

export default GenresSlice.reducer;