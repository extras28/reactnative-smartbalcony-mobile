import balconyApi from 'api/balconyApi';
import plantApi from 'api/plantApi';

const { createSlice, createAsyncThunk, current } = require('@reduxjs/toolkit');

export const thunkGetListPlant = createAsyncThunk('plant/list', async (params, thunkApi) => {
    const res = await plantApi.getListPlant(params);
    return res;
});

export const thunkGetPlantDetail = createAsyncThunk('plant/detail', async (params, thunkApi) => {
    const res = await plantApi.getDetail(params);
    return res;
});

const plantSlice = createSlice({
    name: 'plant',
    initialState: {
        plants: [],
        isGettingPlant: false,

        plantDetail: {},
        isGettingDetail: false,
    },
    reducers: {
        toggleAutoMode: result => {
            if (result === 'success') {
                state.plantDetail.autoMode = !state.plantDetail.autoMode;
            }
        },
    },
    extraReducers: {
        [thunkGetListPlant.pending]: (state, action) => {
            state.isGettingPlant = true;
        },
        [thunkGetListPlant.rejected]: (state, action) => {
            state.isGettingPlant = false;
        },
        [thunkGetListPlant.fulfilled]: (state, action) => {
            state.isGettingPlant = false;
            const { plants, result } = action.payload.data;
            if (result === 'success') {
                state.plants = plants;
            }
        },

        [thunkGetPlantDetail.pending]: (state, action) => {
            state.isGettingDetail = true;
        },
        [thunkGetPlantDetail.rejected]: (state, action) => {
            state.isGettingDetail = false;
        },
        [thunkGetPlantDetail.fulfilled]: (state, action) => {
            state.isGettingDetail = false;
            const { plant, result } = action.payload.data;
            if (result === 'success') {
                state.plantDetail = plant;
            }
        },
    },
});

const { reducer, actions } = plantSlice;
export const { toggleAutoMode, setPlantBreakpoint } = actions;

export default reducer;
