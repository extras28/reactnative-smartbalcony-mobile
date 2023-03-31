import { Dimensions, Platform, Text } from 'react-native';
const AppData = {
    screens: {
        DASHBOARD_HOME_SCREEN: 'DASHBOARD_HOME_SCREEN',
        LOGIN_SCREEN: 'LOGIN_SCREEN',
        SIGN_UP_SCREEN: 'SIGN_UP_SCREEN',
    },
    consts: {
        os: Platform.OS,
        apiBaseUrl: __DEV__
            ? 'https://dev.hopdongdientu.vn/api/v1'
            : 'https://hopdongdientu.vn/api/v1',
        baseUrl: __DEV__ ? 'https://dev.hopdongdientu.vn/' : 'https://dev.hopdongdientu.vn/',
        wsUrl: __DEV__ ? 'wss://dev.hopdongdientu.vn/ws' : 'wss://hopdongdientu.vn/ws',

        deviceHeight: Dimensions.get('screen').height,
        deviceWidth: Dimensions.get('screen').width,
        windowHeight: Dimensions.get('window').height,
        windowWidth: Dimensions.get('window').width,
        figmaWidth: 390,
        figmaHeight: 840,
        scaleWidth: Dimensions.get('screen').width / 390,
        scaleHeight: Dimensions.get('screen').height / 840,
        space_0: 0,
        space_1: 1,
        space_2: 2,
        space_3: 3,
        space_4: 4,
        space_5: 5,
        space_6: 6,
        space_7: 7,
        space_8: 8,
        space_9: 9,
        space_10: 10,
        space_11: 11,
        space_12: 12,
        space_13: 13,
        space_14: 14,
        space_15: 15,
        space_16: 16,
        space_17: 17,
        space_18: 18,
        space_19: 19,
        space_20: 20,
        space_21: 21,
        space_22: 22,
        space_23: 23,
        space_24: 24,
        space_25: 25,
        space_26: 26,
        space_27: 27,
        space_28: 28,
        space_29: 29,
        space_30: 30,
    },
};

export default AppData;
