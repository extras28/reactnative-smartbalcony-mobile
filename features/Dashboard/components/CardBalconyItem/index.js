import AppColor from 'general/constants/AppColor';
import AppResource from 'general/constants/AppResource';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

CardBalconyItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
    onPressEdit: PropTypes.func,
};

CardBalconyItem.defaultProps = {
    image: '',
    name: '',
    humidity: null,
    temperature: null,
    onPressEdit: null,
};

function CardBalconyItem(props) {
    // MARK --- Params ---
    const { image, name, humidity, temperature, onPressEdit } = props;

    // MARK --- Functions: ---
    function handlePressEdit() {
        if (onPressEdit) {
            onPressEdit();
        }
    }
    return (
        <View
            style={{
                marginTop: 20,
            }}>
            <Card style={{ position: 'relative' }}>
                {/* <Card.Title title="Card Title" /> */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 20,
                        backgroundColor: 'white',
                        padding: 5,
                        borderRadius: 5,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0,
                            height: 9,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 10,
                        elevation: 5,
                    }}
                    onPress={() => {
                        handlePressEdit();
                    }}>
                    <Entypo name="dots-three-horizontal" size={15} color={AppColor.darkgrey} />
                </TouchableOpacity>
                <Card.Cover
                    source={
                        {
                            uri: image,
                        } ?? AppResource.images.img_error_image
                    }
                />
                <Card.Content
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                    <Title>{name}</Title>
                    {/* <Paragraph>Card content</Paragraph> */}
                    <View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 10,
                            }}>
                            <MaterialCommunityIcons
                                name="coolant-temperature"
                                size={25}
                                color={AppColor.fireEngineRed}
                            />
                            <Text> {temperature} °C</Text>
                        </View>
                        <View
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="water" size={25} color={AppColor.dodgerblue} />
                            <Text> {humidity} %</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}

export default CardBalconyItem;
