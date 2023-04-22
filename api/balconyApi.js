import axiosClient from './axiosClient';

const balconyApi = {
    getListBalcony: params => {
        const url = '/balcony/find';
        return axiosClient.get(url, { params });
    },

    update: params => {
        const url = '/balcony/update';
        return axiosClient.put(url, params);
    },

    create: params => {
        const url = '/balcony/create';
        return axiosClient.post(url, params);
    },
};
export default balconyApi;
