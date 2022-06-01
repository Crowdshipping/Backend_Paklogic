import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Pressable,
} from 'react-native';
import { ship } from '../theme/assets/svg/shipSvg';
import { backendUrl } from '../appConstants';
import { ButtonOutline } from '../components';
import { getAllShipAddedByProvider } from '../services';
import ShipComponent from '../components/ShipComponent';
import MyLoader from '../components/MyLoader';

const AllShips = ({ navigation }: any) => {
    const [shipResponse, setShipResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const getData = async () => {
        setIsLoading(true);
        try {
            const value = await AsyncStorage.getItem('@user_Id');
            console.log('value of getdata function', value);
            if (value !== null) {
                getAllShipAddedByProvider(value)
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            setIsLoading(false);
                            setShipResponse(result.ships)
                        }
                        // setFlightResponse(result.flights);
                        console.log('getallship', result);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log('error', error)
                    });
            }
        } catch (e) {
            setIsLoading(false);
        }
    };
    React.useEffect(() => {
        getData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            console.log("from back navigation all flight")
            getData();
        });
        return willFocusSubscription;
    }, []);
    return (
        <ScrollView>
            {isLoading ? <MyLoader /> : <View style={styles.container}>
                <ButtonOutline
                    onPress={() => {
                        navigation.navigate('ADDSHIP');
                    }}
                    buttonStyle={{ borderRadius: 18 }}
                    fontSize={18}
                    containerStyle={{
                        paddingHorizontal: 0,
                        width: 145,
                        alignSelf: 'flex-end',
                        marginBottom: 0,
                    }}
                    title="Add New"
                    color="black"
                />
                {shipResponse &&
                    shipResponse.map((item: any) => {
                        console.log('entire item from all flight', item);
                        return (
                            <Pressable
                                onPress={() => {
                                    // navigation.navigate('DetailFlightBooking', {
                                    //     singleFightData: item,
                                    // });
                                }}>
                                <ShipComponent
                                    departureSeaPort={item.departurePort}
                                    destinationSeaPort={item.destinationPort}
                                    date={item.shipDate.slice(0, -14)}
                                    departureTime={item.departureTime}
                                    destinationTime={item.destinationTime}
                                    mmsiNumber={item.mmsiNumber}
                                    myImage={backendUrl + item.ticketImage}
                                    leftSvg={ship}
                                    onPressEdit={() => {
                                        // navigation.navigate('EditTicket');
                                    }}
                                />
                            </Pressable>
                        );
                    })}
            </View>}

        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        marginHorizontal: 20,
    },
    cardView: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: 25,
        width: '100%',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginBottom: 25,
    },
    topView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    bottomView: { flex: 1, paddingVertical: 10 },
    left: { flex: 1 },
    right: { flex: 2 },
    singleTextRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastTextRow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastTextStyle: {
        color: 'green',
    },
});

export default AllShips;