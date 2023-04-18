import authApi from 'api/authApi';
import variable from 'general/constants/variable';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const thunkLogin = createAsyncThunk('auth/login', async (params, thunkApi) => {
    const res = await authApi.login(params);
    return res;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isGettingCurrentAccount: false,
        currentAccount: {},
    },
    reducers: {},
    extraReducers: {
        [thunkLogin.pending]: (state, action) => {
            state.isGettingCurrentAccount = true;
        },
        [thunkLogin.rejected]: (state, action) => {
            state.isGettingCurrentAccount = false;
        },
        [thunkLogin.fulfilled]: (state, action) => {
            state.isGettingCurrentAccount = false;
            const { result, account } = action.payload.data;
            if (result === 'success') {
                state.currentAccount = account;
                variable.accessToken = account.accessToken;
            }
        },
    },
});

const { reducer, actions } = authSlice;
export const {} = actions;

export default reducer;
