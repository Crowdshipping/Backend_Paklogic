import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { ButtonOutline } from '../../../../components';
import MyLoader from '../../../../components/MyLoader';
import { getAllVehicles } from '../../../../services';
import VehicleContainer from './Components/VehicleContainer';

const AllVehicles = ({ navigation, status, myColor }: any) => {
    const [vehicleResponse, setVehicleResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const getData = async () => {
        setIsLoading(true);
        try {
            const value = await AsyncStorage.getItem('@user_Id');
            console.log('value of getdata function', value);
            if (value !== null) {
                getAllVehicles("625510f2d8e3e400045de1bf")
                    .then(response => response.json())
                    .then(result => {
                        setIsLoading(false);
                        if (result.success) {
                            setVehicleResponse(result.vehicles)
                        }
                        // setFlightResponse(result.flights);
                        console.log('Fvehicle', result);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log('error', error)
                    });

            }
        } catch (e) { }
    };

    React.useEffect(() => {
        getData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getData();
        });
        return willFocusSubscription;
    }, []);
    return (
        <ScrollView>
            {isLoading ?
                <MyLoader /> :
                <View style={styles.container}>
                    <ButtonOutline
                        onPress={() => {
                            navigation.navigate('ADDVEHICLE');
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
                    {vehicleResponse && vehicleResponse.map((item: any) => {
                        return <VehicleContainer
                            vehicleType={item.vehicleType}
                            vehicleName={item.vehicleName}
                            vehicleColor={item.vehicleColor}
                            vehicleModel={item.vehicleModel}
                            licenceNumber={item.licenseNumber}
                            state={"When admin will complete"}
                            onPress={() => {
                                console.log("container pressed")
                                navigation.navigate('VEHICLEDETAIL', {
                                    vehicleData: item,
                                });

                            }}

                        // onPress={() => {
                        //     // navigation.navigate('DetailFlightBooking', {
                        //     //     singleFightData: item,
                        //     // });
                        // }}
                        // onDeletePress={() => {
                        //     // Alert.alert("",
                        //     //     "Are you sure to Delete?",
                        //     //     [
                        //     //         {
                        //     //             text: 'Yes', onPress: () => {
                        //     //                 setIsloading(true);
                        //     //                 deleleFlightRecord(item._id)
                        //     //                     .then(response => response.json())
                        //     //                     .then((result) => {
                        //     //                         getData();
                        //     //                         setIsloading(false);

                        //     //                         console.log("delete flight", result);
                        //     //                         // postRequestData
                        //     //                     })
                        //     //                     .catch(error => {
                        //     //                         console.log("error", error);
                        //     //                         setIsloading(false);
                        //     //                     });
                        //     //             },
                        //     //             style: 'default',
                        //     //         },
                        //     //         { text: 'No' },
                        //     //     ],
                        //     //     { cancelable: false }
                        //     // )
                        // }}
                        />
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
});

export default AllVehicles;
