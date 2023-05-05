import axiosClient from './axiosClient';

const plantApi = {
    getListPlant: params => {
        const url = '/plant/find';
        return axiosClient.get(url, { params });
    },

    getDetail: params => {
        const url = '/plant/detail';
        return axiosClient.get(url, { params });
    },

    toggleAutoMode: params => {
        const url = '/plant/auto-mode';
        return axiosClient.post(url, params);
    },

    manualControl: params => {
        const url = '/plant/control';
        return axiosClient.post(url, params);
    },

    setMoistureBreakpoint: params => {
        const url = '/plant/breakpoint';
        return axiosClient.post(url, params);
    },
};

export default plantApi;
