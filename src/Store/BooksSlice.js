import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";
const initialState = {
    books: [],
    errors: "",
    booksLoading: false,
    headers: "",
    bookProccess: false,
    bookUpdate: null,
    bookAdd: null
}

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (bookData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { fields, searchQuery, sortby, pageNumber, pageSize } = bookData;
        try {
            const books = await axios.get(
                `${API_URL}/Genres/00000000-0000-0000-0000-000000000000/Books?${fields ? `fields=${fields}` : ''}${searchQuery ? `&SearchQuery=${searchQuery}` : ''}${pageNumber ? `&PageNumber=${pageNumber}` : ''}${pageSize ? `&PageSize=${pageSize}` : ''}${sortby ? `&sortby=${sortby}` : ''}`
            );
            return books;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const insertBook = createAsyncThunk(
    "books/insert",
    async (bookData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        const { genreId } = bookData;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const books = await axios.post(`${API_URL}/Genres/${genreId}/Books`,
                bookData,
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
)

export const editBook = createAsyncThunk(
    "books/edit",
    async (bookData, thunkAPI) => {
        const { id } = bookData;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        const book = await axios.put(`${API_URL}/Genres/${bookData.genre.id}/Books/${id}`,
            bookData,
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
        return book;
    }
)

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (bookData, thunkAPI) => {

        const { rejectWithValue } = thunkAPI;
        const { bookId, genreId } = bookData;

        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const books = await axios.delete(`${API_URL}/Genres/${genreId}/Books/${bookId}`,
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
            return books.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const BooksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: {
        [getBooks.pending]: (state, action) => {
            state.booksLoading = true;
            state.errors = null;
        },
        [getBooks.fulfilled]: (state, action) => {
            state.books = action.payload.data;
            state.headers = action.payload.headers;
            state.booksLoading = false;
        },
        [getBooks.rejected]: (state, action) => {
            state.booksLoading = false;
            state.errors = action.payload;
        },

        [insertBook.pending]: (state, action) => {
            state.errors = null;
            state.bookProccess = true;
            state.bookAdd = false;
            state.bookUpdate = false;
        },
        [insertBook.fulfilled]: (state, action) => {
            if (action.payload.status === 201) {
                state.bookProccess = false;
                state.bookAdd = true;
            } else {
                state.errors = action.payload?.data?.errors?.description[0];
                state.bookProccess = false;
            }
        },
        [insertBook.rejected]: (state, action) => {
            state.errors = action.payload;
            state.bookProccess = false;
        },

        [editBook.pending]: (state, action) => {
            state.errors = null;
            state.bookProccess = true;
            state.bookAdd = false;
            state.bookUpdate = false;
        },
        [editBook.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.bookProccess = false;
                state.bookUpdate = true;
            } else {
                state.errors = action.payload?.data?.errors?.description[0];
                state.bookProccess = false;
            }
        },
        [editBook.rejected]: (state, action) => {
            state.errors = action.payload;
            state.bookProccess = false;
        },

        [deleteBook.pending]: (state, action) => {
            state.errors = null;
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.books = state.books.filter((b) => b.id !== action.meta?.arg?.bookId);
        },
        [deleteBook.rejected]: (state, action) => {
            state.booksLoading = false;
            state.errors = action.payload;
        }
    }
});

export default BooksSlice.reducer;