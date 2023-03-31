const AppResource = {
    images: {
        img_login_bg: require('../../assets/images/img_login_bg.png'),
        img_logo: require('../../assets/images/img_logo.png'),
    },
    icons: {
        ic_input_clear: require('../../assets/icons/ic_input_clear/ic_input_clear.png'),
        ic_eye_available: require('../../assets/icons/ic_eye_available/ic_eye_available.png'),
        ic_eye_slash: require('../../assets/icons/ic_eye_slash/ic_eye_slash.png'),
    },
    Dimensions: {
        navigationBar: {
            titleSize: 16,
            height: 44,
        },

        tabBar: {
            fontSize: 12,
            iconSize: 20,
        },

        tableView: {
            textTitleSize: 14,
            textDescriptionSize: 12,
        },

        base: 16,
    },
    Fonts: {
        light: 'Inter-Light',
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
    },
};

export default AppResource;