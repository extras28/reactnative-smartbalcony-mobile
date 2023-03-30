import axiosClient from './axiosClient';

const authApi = {
    login: parmas => {
        const url = '/account/sign-in';
        return axiosClient.post(url, parmas);
    },
};

export default authApi;
