import weatherApi from 'api/weatherApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const thunkGetCurrentWeather = createAsyncThunk(
    'dashboard/weather',
    async (params, thunkApi) => {
        const res = await weatherApi.getCurrentWeather(params);
        return res;
    },
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isGettingCurrentWeather: false,
        currentWeather: {},
    },
    reducers: {},
    extraReducers: {
        [thunkGetCurrentWeather.pending]: (state, action) => {
            state.isGettingCurrentWeather = true;
        },
        [thunkGetCurrentWeather.rejected]: (state, action) => {
            state.isGettingCurrentWeather = false;
        },
        [thunkGetCurrentWeather.fulfilled]: (state, action) => {
            state.isGettingCurrentWeather = false;
            const { data } = action.payload;
            if (data) {
                state.currentWeather = data;
            }
        },
    },
});

const { reducer, actions } = dashboardSlice;
export const {} = actions;

export default reducer;
