import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    authors: [],
    errors: null,
    authorsLoading: false,
    authorAdded: false,
    authorUpdated: false
}

export const getAuthors = createAsyncThunk(
    "authors/getAuthors",
    async (authorsData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { fields, searchQuery, pageNumber, pageSize } = authorsData;
        try {
            const books = await axios.get(
                `${API_URL}/Authors?${fields ? `fields=${fields}` : ''}${searchQuery ? `&SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}`
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
            return books;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertAuthor = createAsyncThunk(
    "authors/insert",
    async (authorData, thunkAPI) => {
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        const author = await axios.post(`${API_URL}/Authors`,
            authorData,
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
        return author;
    }
);


export const editAuthor = createAsyncThunk(
    "authors/edit",
    async (authorData, thunkAPI) => {
        const { id } = authorData;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        const author = await axios.put(`${API_URL}/Authors/${id}`,
            authorData,
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
        return author;
    }
);

export const deleteAuthor = createAsyncThunk(
    "authors/deleteAuthors",
    async (auhtorId, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const books = await axios.delete(`${API_URL}/Authors/${auhtorId}`,
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
            return books;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const AuthorSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        resetState: (state) => {
            state.authorAdded = false;
            state.authorUpdated = false;
        }
    },
    extraReducers: {
        [getAuthors.pending]: (state, action) => {
            state.errors = null;
            state.authorsLoading = true;
        },
        [getAuthors.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.authors = action.payload.data;
                state.headers = action.payload.headers;
            }
            state.errors = action.payload?.errors;
            state.authorsLoading = false;
        },
        [getAuthors.rejected]: (state, action) => {
            console.log(action)
        },

        [insertAuthor.pending]: (state, action) => {
            state.errors = null;
        },
        [insertAuthor.fulfilled]: (state, action) => {
            if (action.payload?.status === 201) {
                state.authorUpdated = false;
                state.authorAdded = true;
                state.errors = null;
            } else {
                state.errors = action.payload?.data.title;
            }
        },
        [insertAuthor.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [editAuthor.pending]: (state, action) => {
            state.errors = null;
        },
        [editAuthor.fulfilled]: (state, action) => {
            if (action.payload?.status === 204) {
                state.authorUpdated = true;
                state.authorAdded = false;
                state.errors = null;
            } else {
                state.errors = action.payload?.data.title;
            }
        },
        [editAuthor.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [deleteAuthor.pending]: (state, action) => {
            state.errors = null;
        },
        [deleteAuthor.fulfilled]: (state, action) => {
            state.authors = state.authors.filter((b) => b.id !== action.meta?.arg);
        },
        [deleteAuthor.rejected]: (state, action) => {
            state.errors = action.payload;
        }

    }
});

export const { resetState } = AuthorSlice.actions;

export default AuthorSlice.reducer;