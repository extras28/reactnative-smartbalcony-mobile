import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import BaseScreenView from 'general/components/BaseScreenView/index';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import AppColor from 'general/constants/AppColor';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Utils from 'general/utils/Utils';
import Geolocation from 'react-native-geolocation-service';
import Global from 'general/constants/Global';

DashboardHomeScreen.propTypes = {};

function DashboardHomeScreen(props) {
    function getLocation() {
        const permissionStatus = Utils.checkAppPermission(
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        );
        console.log(permissionStatus);
        if (permissionStatus === 'granted') {
            console.log('oke');
            Geolocation.getCurrentPosition(
                position => {
                    console.log(position);
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );
        }
    }
    return (
        <BaseScreenView>
            {/* <Text>dashboard</Text>
            <AntDesignIcon name="home" size={30} color={AppColor.feature} /> */}
            <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        Utils.requestAppPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
                    }}>
                    <Text>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        getLocation();
                    }}>
                    <Text>Get location</Text>
                </TouchableOpacity>
            </View>
        </BaseScreenView>
    );
}

export default DashboardHomeScreen;
