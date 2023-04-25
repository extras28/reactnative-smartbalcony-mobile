import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    ScrollView,
    RefreshControl,
} from 'react-native';
import BaseScreenView from 'general/components/BaseScreenView/index';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/dist/FontAwesome5';
import AppColor from 'general/constants/AppColor';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Utils from 'general/utils/Utils';
import Geolocation from 'react-native-geolocation-service';
import Global from 'general/constants/Global';
import AppBackButton from 'general/components/AppBackButton';
import AppResource from 'general/constants/AppResource';
import CardBalconyItem from 'features/Dashboard/components/CardBalconyItem';
import AppStyle from 'general/constants/AppStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyle from 'general/constants/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { thunkGetListBalcony } from 'features/Dashboard/dashboardSlice';
import balconyApi from 'api/balconyApi';
import variable from 'general/constants/variable';
import ModalEditBalcony from 'features/Dashboard/components/ModalEditBalcony';
import ModalDeleteBalcony from 'features/Dashboard/components/ModalDeleteBalcony';
import { useTranslation } from 'react-i18next';
import { AppLoadingHelper } from 'general/components/AppLoading';

DashboardHomeScreen.propTypes = {};

const sTag = '[DashboardHomeScreen]';

function DashboardHomeScreen(props) {
    // MARK --- Params: ---
    const [loading, setLoading] = useState(false);
    const [showingModalEditBalcony, setShowingModalEditBalcony] = useState(false);
    const [showingModalDeletebalcony, setShowingModalDeleteBalcony] = useState(false);
    const [selectedBalconyItem, setSelectedBalconyItem] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { balconies, isGettingListbalcony } = useSelector(state => state?.dashboard);

    // MARK --- Functions: ---
    async function getListBalcony() {
        try {
            const res = unwrapResult(await dispatch(thunkGetListBalcony({})));
            // const res = await balconyApi.getListBalcony();
            // log;
        } catch (error) {
            console.error(`${sTag} get list balcony error: ${error.message}`);
        }
    }

    async function handleDeleteBalcony() {
        try {
            AppLoadingHelper.current.show(t('Loading...'));
            const res = await balconyApi.delete({ balconyId: selectedBalconyItem.balconyId });
            const { result } = res.data;
            if (result === 'success') {
                Utils.toast({
                    message: t('Cập nhật ban công thành công'),
                });
                dispatch(thunkGetListBalcony({}));
                setShowingModalDeleteBalcony(false);
            }
            AppLoadingHelper.current.hide();
        } catch (error) {
            console.error(`${sTag} delete balcony error: ${error.message}`);
        }
    }

    // MARK --- Hooks: ---
    useEffect(() => {
        getListBalcony();
    }, []);

    return (
        <BaseScreenView
            safeAreaEdges={['left', 'right']}
            statusBarStyle={'dark-content'}
            backgroundColor={AppColor.bg}>
            <ImageBackground
                source={AppResource.images.img_bg}
                resizeMode="cover"
                style={{
                    flex: 1,
                }}
                blurRadius={5}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        elevation: 12,
                        shadowColor: 'rgba(0, 0, 0, 0.15)',
                        shadowOffset: { width: 0, height: 12 },
                        shadowRadius: 50,
                        // paddingHorizontal: 30,
                    }}>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 40,
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('user');
                            }}>
                            <FontAwesome5Icon
                                name="user-alt"
                                size={20}
                                color={AppColor.slategray}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: AppColor.slategray }}>Ban công</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowingModalEditBalcony(true);
                            }}>
                            <AntDesignIcon
                                name="pluscircleo"
                                size={20}
                                color={AppColor.slategray}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={{ paddingHorizontal: 20 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                tintColor={AppColor.white}
                                onRefresh={() => {
                                    console.log('refresh');
                                    getListBalcony();
                                    // dispatch(thunkGetProfile());
                                    // dispatch(thunkGetDashboardSummaryData());
                                    // dispatch(thunkGetDashboardRecentlyContracts());
                                }}
                            />
                        }>
                        {balconies?.map((item, index) => {
                            return (
                                <CardBalconyItem
                                    key={index}
                                    image={item?.image}
                                    name={item?.name}
                                    humidity={parseInt(item?.humidity ?? 0)}
                                    temperature={parseInt(item?.temperature ?? 0)}
                                    onPressEdit={() => {
                                        setSelectedBalconyItem(item);
                                        setShowingModalEditBalcony(true);
                                    }}
                                    onPressDelete={() => {
                                        setSelectedBalconyItem(item);
                                        setShowingModalDeleteBalcony(true);
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ImageBackground>

            {/* modal edit */}
            <ModalEditBalcony
                show={showingModalEditBalcony}
                onClose={() => {
                    setShowingModalEditBalcony(false);
                    setSelectedBalconyItem(null);
                }}
                balconyItem={selectedBalconyItem}
            />

            {/* modal delete */}
            <ModalDeleteBalcony
                show={showingModalDeletebalcony}
                onClose={() => {
                    setShowingModalDeleteBalcony(false);
                    setSelectedBalconyItem(null);
                }}
                balconyItem={{ selectedBalconyItem }}
                onDelete={handleDeleteBalcony}
            />
        </BaseScreenView>
    );
}

export default DashboardHomeScreen;
