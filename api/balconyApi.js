import axiosClient from './axiosClient';

const balconyApi = {
    getListBalcony: params => {
        const url = '/balcony/find';
        return axiosClient.get(url, { params });
    },
};
export default balconyApi;
