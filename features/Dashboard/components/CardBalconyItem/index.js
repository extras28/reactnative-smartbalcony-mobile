import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AppColor from 'general/constants/AppColor';

CardBalconyItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
};

CardBalconyItem.defaultProps = {
    image: '',
    name: '',
    humidity: null,
    temperature: null,
};

function CardBalconyItem(props) {
    // MARK --- Params ---
    const { image, name, humidity, temperature } = props;
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
                        console.log('edit');
                    }}>
                    <FontAwesome5 name="pen" size={15} color={AppColor.deepskyblue} />
                </TouchableOpacity>
                <Card.Cover
                    source={{
                        uri: image,
                    }}
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
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </Card>
        </View>
    );
}

export default CardBalconyItem;
