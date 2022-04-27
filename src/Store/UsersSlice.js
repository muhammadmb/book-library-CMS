import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../API/axios";
import { API_URL } from "../API/URLConstants";
import ParseJWT from "../Helper/ParseJWT";
import { refreshToken } from "./AuthSlice";

const initialState = {
    users: [],
    errors: "",
    headers: "",
    status: "",
    usersLoading: false,
    userUpdating: false,
    userDeleting: false,
    userAdding: false
}

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const users = await axios.get(`${API_URL}/setup/GetAllUsers`,
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
            return users;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addUserToRole = createAsyncThunk(
    "users/addUserToRole",
    async (userDate, thunkAPI) => {
        const { email, role } = userDate;
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const user = await axios.post(`${API_URL}/setup/AddUserToRole?email=${email}&roleName=${role}`,
                null,
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
            return user;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeUserFromRole = createAsyncThunk(
    "users/removeUserFromRole",
    async (userDate, thunkAPI) => {
        const { email, role } = userDate;
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const user = await axios.post(`${API_URL}/setup/RemoveUserFromRole?email=${email}&roleName=${role}`,
                null,
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
            return user;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (email, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (Math.floor((new Date()).getTime() / 1000) > ParseJWT(JSON.parse(localStorage.getItem("user")).token).exp) {
            await thunkAPI.dispatch(refreshToken());
        }
        try {
            const user = await axios.delete(`${API_URL}/setup/deleteUser?email=${email}`,
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
            return user;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.errors = null;
            state.usersLoading = true;
        },
        [getUsers.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.users = action.payload.data;
                state.headers = action.payload.headers;
                state.status = action.payload.status;
            }
            state.errors = action.payload?.data?.errors;
            state.usersLoading = false;
        },
        [getUsers.rejected]: (state, action) => {
            state.errors = action.payload;
        },

        [addUserToRole.pending]: (state, action) => {
            state.userUpdating = true;
            state.errors = null;
        },
        [addUserToRole.fulfilled]: (state, action) => {
            state.headers = action.payload.headers;
            state.status = action.payload.status;
            state.userUpdating = false;
        },
        [addUserToRole.rejected]: (state, action) => {
            state.userUpdating = false;
            state.errors = action.payload;
        },

        [removeUserFromRole.pending]: (state, action) => {
            state.userUpdating = true;
            state.errors = null;
        },
        [removeUserFromRole.fulfilled]: (state, action) => {
            state.headers = action.payload.headers;
            state.status = action.payload.status;
            state.userUpdating = false;
        },
        [removeUserFromRole.rejected]: (state, action) => {
            state.userUpdating = false;
            state.errors = action.payload;
        },

        [deleteUser.pending]: (state, action) => {
            state.userDeleting = true;
            state.errors = null;
        },
        [deleteUser.fulfilled]: (state, action) => {
            if (action.payload.status === 204) {
                state.users = state.users.filter(u => u.email !== action.meta.arg)
            }
            state.headers = action.payload.headers;
            state.status = action.payload.status;
            state.userDeleting = false;
        },
        [deleteUser.rejected]: (state, action) => {
            state.userDeleting = false;
            state.errors = action.payload;
        },
    }
})

export default UsersSlice.reducer;