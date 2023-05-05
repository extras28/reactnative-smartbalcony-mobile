import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ImageBackground,
    View,
    Text,
    Image,
    Switch,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientBorderView } from '@good-react-native/gradient-border';
import BaseScreenView from 'general/components/BaseScreenView';
import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import DeviceConstants from 'general/constants/DeviceConstants';
import { useDispatch, useSelector } from 'react-redux';
import plantApi from 'api/plantApi';
import { setPlantBreakpoint, thunkGetPlantDetail, toggleAutoMode } from 'features/Plant/plantSlice';
import CardPlantAction from 'features/Plant/components/CardPlantItem/CardPlantAction';
import Utils from 'general/utils/Utils';
import ActionSheet from 'react-native-actions-sheet';
import AppData from 'general/constants/AppData';

PlantDetailScreen.propTypes = {};

const sTag = '[PlantDetailScreen]';

function PlantDetailScreen(props) {
    // MARK --- Params: ---
    const [loading, setLoading] = useState(false);
    const { plantDetail, isGettingDetail } = useSelector(state => state?.plant);
    const [isEnabled, setIsEnabled] = useState(plantDetail?.autoMode);
    const [isWatering, setIsWatering] = useState(false);
    const dispatch = useDispatch();
    const actionSheetRef = useRef(null);
    const [breakpoint, setBreakpoint] = useState(plantDetail?.soilMoistureBreakpoint);

    // MARK --- Functions: ---
    async function handleToggleAutoMode(status) {
        try {
            setIsEnabled(!isEnabled);
            setIsWatering(false);
            const res = await plantApi.toggleAutoMode({
                plantId: plantDetail?.plantId,
                autoMode: status,
            });
            const { result, message } = res.data;
            if (result === 'success') {
                dispatch(toggleAutoMode(result));
                Utils.toast({
                    message: message,
                });
            }
        } catch (error) {
            console.log(`${sTag} toggle auto mode error: ${error.message}`);
        }
    }

    // MARK --- Hooks: ---
    useEffect(() => {
        setIsEnabled(plantDetail?.autoMode);
        setBreakpoint(plantDetail?.soilMoistureBreakpoint);
    }, [plantDetail]);

    async function handleManualWatering(code) {
        try {
            setIsWatering(!isWatering);
            const res = await plantApi.manualControl({
                plantId: plantDetail?.plantId,
                requestCode: code ? 1 : 0,
            });
            const { result, message } = res.data;
        } catch (error) {
            console.log(`${sTag} manual watering error: ${error.message}`);
        }
    }

    async function handleSetBreakpoint(params) {
        try {
            const res = await plantApi.setMoistureBreakpoint({
                plantId: plantDetail?.plantId,
                soilMoistureBreakpoint: params,
            });
            const { result, message } = res.data;
            if (result === 'success') {
                Utils.toast({
                    message: message,
                });
            }
            actionSheetRef.current?.hide();
        } catch (error) {
            console.log(`${sTag} set breakpoint error: ${error.message}`);
        }
    }

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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            tintColor={AppColor.white}
                            onRefresh={() => {
                                console.log(`${sTag} refresh`);
                                dispatch(thunkGetPlantDetail({ plantId: plantDetail?.plantId }));
                            }}
                        />
                    }>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 40,
                        }}>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                height: 600,
                                paddingHorizontal: 30,
                            }}>
                            <Text style={{ fontSize: 20, color: '#000' }}>{plantDetail?.name}</Text>
                            <GradientBorderView
                                gradientProps={{
                                    colors: ['#34a0a4', '#b5e48c'],
                                }}
                                style={{
                                    borderWidth: 5,
                                    borderRadius: 10,
                                    width: '100%',
                                    height: 200,
                                }}>
                                <Image
                                    source={{ uri: plantDetail?.image }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                />
                            </GradientBorderView>
                            <GradientBorderView
                                gradientProps={{
                                    colors: ['#ade8f4', '#0077b6'],
                                }}
                                style={{
                                    borderWidth: 5,
                                    borderRadius: 100,
                                    height: 200,
                                    width: 200,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 20,
                                }}>
                                <View
                                    style={{
                                        width: 170,
                                        height: 170,
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 85,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo name="water" size={40} color="#00b4d8" />
                                    <Text style={{ fontWeight: '700', fontSize: 30 }}>{`${
                                        plantDetail?.soilMoisture ?? 0
                                    } %`}</Text>
                                </View>
                            </GradientBorderView>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text>Tự động tưới: </Text>
                                <Switch
                                    thumbColor={isEnabled ? '#00b4d8' : '#f4f3f4'}
                                    onValueChange={() => handleToggleAutoMode(!isEnabled)}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 30 }}>
                        <CardPlantAction
                            title="Ngưỡng độ ẩm"
                            disabled={!isEnabled}
                            additionalElement={
                                <TouchableOpacity
                                    disabled={!isEnabled}
                                    onPress={() => {
                                        actionSheetRef.current?.show();
                                    }}>
                                    <Text style={{ color: AppColor.crimson }}>
                                        {`${breakpoint ? breakpoint + '%' : 'chọn'}`}{' '}
                                    </Text>
                                </TouchableOpacity>
                            }
                        />
                        <CardPlantAction
                            title="Tưới cây"
                            disabled={isEnabled}
                            additionalElement={
                                <Switch
                                    thumbColor={isWatering ? '#00b4d8' : '#f4f3f4'}
                                    onValueChange={() => handleManualWatering(!isWatering)}
                                    value={isWatering}
                                    disabled={isEnabled}
                                />
                            }
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
            <ActionSheet ref={actionSheetRef} containerStyle={{ height: '30%' }}>
                <ScrollView>
                    {AppData.breakpoints.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    padding: 8,
                                    borderBottomColor: AppColor.lightslategrey,
                                    borderBottomWidth: 0.5,
                                }}
                                onPress={() => {
                                    setBreakpoint(item);
                                    handleSetBreakpoint(item);
                                }}>
                                <Text>{item + '%'}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </ActionSheet>
        </BaseScreenView>
    );
}

export default PlantDetailScreen;
