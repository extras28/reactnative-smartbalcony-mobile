import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Utils from 'general/utils/Utils';

DataCommonListener.propTypes = {};

function DataCommonListener(props) {
    useEffect(() => {
        Utils.connectMQTT('IOTUET_RECEIVING');
    }, []);

    return <View></View>;
}

export default DataCommonListener;
