import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppColor from 'general/constants/AppColor';
import {
    ImageBackground,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import BaseScreenView from 'general/components/BaseScreenView';
import AppResource from 'general/constants/AppResource';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import CardPlantItem from 'features/Plant/components/CardPlantItem';
import { thunkGetListPlant, thunkGetPlantDetail } from 'features/Plant/plantSlice';
import Global from 'general/constants/Global';
import NavigationHelper from 'general/helpers/NavigationHelper';
import AppData from 'general/constants/AppData';
import ModalEditPlant from 'features/Plant/components/ModalEditPlant';

PlantHomeScreen.propTypes = {};

function PlantHomeScreen(props) {
    // MARK --- Params: ---
    const [showingModalEditPlant, setShowingModalEditPlant] = useState(false);
    const [showingModalDeletePlant, setShowingModalDeletePlant] = useState(false);
    const [selectedPlantItem, setSelectedPlantItem] = useState(null);
    const { plants, isGettingPlant } = useSelector(state => state?.plant);
    const [loading, setLoading] = useState(isGettingPlant);
    const dispatch = useDispatch();
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
                        {/* <TouchableOpacity
                            onPress={() => {
                                console.log('user');
                            }}>
                            <FontAwesome5Icon
                                name="user-alt"
                                size={20}
                                color={AppColor.slategray}
                            />
                        </TouchableOpacity> */}
                        <Text style={{ fontSize: 20, color: AppColor.slategray }}>
                            {Global.balconyItem?.name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowingModalEditPlant(true);
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
                                refreshing={isGettingPlant}
                                tintColor={AppColor.white}
                                onRefresh={() => {
                                    console.log('refresh');
                                    dispatch(
                                        thunkGetListPlant({
                                            balconyId: Global.balconyItem?.balconyId,
                                        }),
                                    );
                                }}
                            />
                        }>
                        {plants?.map((item, index) => {
                            return (
                                <CardPlantItem
                                    key={index}
                                    balconyItem={item}
                                    onPress={() => {
                                        dispatch(thunkGetPlantDetail({ plantId: item.plantId }));
                                        NavigationHelper.goScreen(
                                            AppData.screens.PLANT_DETAIL_SCREEN,
                                        );
                                    }}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ImageBackground>

            {/* modal edit plant */}
            <ModalEditPlant
                show={showingModalEditPlant}
                onClose={() => {
                    setShowingModalEditPlant(false);
                    setSelectedPlantItem(null);
                }}
                balconyItem={selectedPlantItem}
            />
        </BaseScreenView>
    );
}

export default PlantHomeScreen;
