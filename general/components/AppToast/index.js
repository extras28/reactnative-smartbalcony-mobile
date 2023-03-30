import React from 'react';
import PropTypes from 'prop-types';
import { ToastProvider, useToast } from 'react-native-toast-notifications';

AppToast.propTypes = {};

function AppToast(props) {
    // MARK --- Params: ---
    const { children } = props;
    const toast = useToast();
    // MARK --- Hooks: ---

    return (
        <ToastProvider
            placement="bottom | top"
            duration={5000}
            animationType="slide-in | zoom-in"
            animationDuration={250}
            successColor="green"
            dangerColor="red"
            warningColor="orange"
            normalColor="gray"
            // icon={<Icon />}
            // successIcon={<SuccessIcon />}
            // dangerIcon={<DangerIcon />}
            // warningIcon={<WarningIcon />}
            textStyle={{ fontSize: 20 }}
            offset={50} // offset for both top and bottom toasts
            offsetTop={30}
            offsetBottom={40}
            swipeEnabled={true}
            renderToast={toastOptions => (
                <View style={{ padding: 15, backgroundColor: 'grey' }}>
                    <Text>{toast.message}</Text>
                </View>
            )}>
            {children}
        </ToastProvider>
    );
}

export default AppToast;
