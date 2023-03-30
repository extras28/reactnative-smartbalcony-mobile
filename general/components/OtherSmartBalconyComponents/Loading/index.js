import React from 'react';
import PropTypes from 'prop-types';
import AppColor from 'general/constants/AppColor';
import { StyleSheet, View } from 'react-native';
import { Swing } from 'react-native-animated-spinkit';
import DeviceConstants from 'general/constants/DeviceConstants';
import { Backdrop } from 'react-native-backdrop';
import { Text } from 'react-native-svg';

Loading.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
};

Loading.defaultProps = {
    size: 48,
    color: AppColor.feature,
};

function Loading(props) {
    // MARK --- Params: ---
    const { size, color } = props;
    return (
        <View style={styles.container}>
            {/* <Backdrop
                visible={true}
                // handleOpen={handleOpen}
                // handleClose={handleClose}
                // onClose={() => {}}
                swipeConfig={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80,
                }}
                animationConfig={{
                    speed: 14,
                    bounciness: 4,
                }}
                overlayColor="rgba(0,0,0,0.32)"
                backdropStyle={{
                    backgroundColor: '#fff',
                }}>
                <View> */}
                    <Swing size={size} color={color} />
                    {/* <Text>oke</Text> */}
                {/* </View>
            </Backdrop> */}
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: DeviceConstants.screenWidth,
        height: DeviceConstants.screenHeight,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
