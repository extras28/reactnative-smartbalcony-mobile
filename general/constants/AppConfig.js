const AppConfig = {
    apiBaseUrl: __DEV__
        ? 'https://smart-balcony.onrender.com/api/v1'
        : 'https://smart-balcony.onrender.com/api/v1',
    baseUrl: __DEV__
        ? 'https://smart-balcony.onrender.com/api/v1'
        : 'https://smart-balcony.onrender.com/api/v1',
    wsUrl: __DEV__ ? 'wss://dev.hopdongdientu.vn/ws' : 'wss://hopdongdientu.vn/ws',
    baseWeatherUrl: 'https://api.openweathermap.org/data/2.5',
    weatherApiKey: 'cf26e7b2c25b5acd18ed5c3e836fb235',
};
export default AppConfig;
