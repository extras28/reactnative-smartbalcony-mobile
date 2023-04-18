import balconyApi from 'api/balconyApi';
import weatherApi from 'api/weatherApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const thunkGetListBalcony = createAsyncThunk('dashbard/list', async (params, thunkApi) => {
    const res = await balconyApi.getListBalcony(params);
    return res;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isGettingListbalcony: false,
        balconies: [],
    },
    reducers: {},
    extraReducers: {
        [thunkGetListBalcony.pending]: (state, action) => {
            state.isGettingListbalcony = true;
        },
        [thunkGetListBalcony.rejected]: (state, action) => {
            state.isGettingListbalcony = false;
        },
        [thunkGetListBalcony.fulfilled]: (state, action) => {
            state.isGettingListbalcony = false;
            const { balconies, result } = action.payload.data;
            if (result === 'success') {
                state.balconies = balconies;
            }
        },
    },
});

const { reducer, actions } = dashboardSlice;
export const {} = actions;

export default reducer;
