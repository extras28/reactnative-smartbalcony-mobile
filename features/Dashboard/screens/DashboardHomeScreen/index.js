import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import BaseScreenView from 'general/components/BaseScreenView/index';

DashboardHomeScreen.propTypes = {};

function DashboardHomeScreen(props) {
    return (
        <BaseScreenView>
            <Text>
                dashboard
            </Text>
            
        </BaseScreenView>
    );
}

export default DashboardHomeScreen;
