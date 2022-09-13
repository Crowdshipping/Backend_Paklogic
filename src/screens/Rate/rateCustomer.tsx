import { View, Text, StyleSheet, TextInput, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Rating } from 'react-native-elements';
import { Button } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RateDelivery } from '../services';
import { backendUrl } from '../../appConstants';
import { ScrollView } from 'react-native-gesture-handler';

export default function RateCustomer({ navigation, route }: any) {
    console.log("Tracking Item", route.params.item)
    const [rating, setRating] = React.useState<any>()
    const [isloading, setLoading] = React.useState<any>(false)



    const uploadData = async (response: any) => {
        setLoading(true)
        const value = await AsyncStorage.getItem('@user_Id');
        let data = {
            requestId: route.params.item._id,
            ratedBy: value,
            rate: rating,
            ratedTo: route.params.item.requestedBy._id,
        }
        if (value !== null) {
            RateDelivery(data)
                .then(response => response.json())
                .then(result => {
                    console.log('jhnkjh', result);
                    if (result.success) {
                        Alert.alert('CrowdShipping', "You have rated Sucessfully")
                        setLoading(false)
                        if (route.params.item.type === 'Flight' || route.params.item.type === 'Ship') {
                            navigation.navigate('ProviderDrawer')
                        } else {
                            navigation.navigate('DriverDrawer');
                        }

                    } else {
                        Alert.alert('CrowdShipping', result.message)
                        setLoading(false)
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.log('CrowdShipping', error);
                    Alert.alert('Alert', error);
                });
        }
    }



    const ratingCompleted = (rating: any) => {
        setRating(rating);
        console.log("Rating is: " + rating)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={{ marginTop: hp('10%') }}>
                    <View style={styles.imgview}>
                        {!route.params.item.requestedBy.profilepic ?
                            <Avatar
                                size={110}
                                rounded
                                icon={{ name: "person", color: 'grey', size: 90 }}
                                containerStyle={styles.img}
                            />
                            :
                            <Image
                                source={
                                    {
                                        uri: backendUrl + route.params.item.requestedBy.profilepic
                                    }
                                }
                                style={styles.img}
                            />
                        }
                    </View>
                    <View style={{ alignItems: 'center', marginTop: hp("2%") }}>
                        <Text>{route.params.item.requestedBy.firstname + ' ' + route.params.item.requestedBy.lastname}</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: hp('5%') }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Rate Your Customer</Text>
                        <Rating
                            type='custom'
                            ratingColor='red'
                            ratingBackgroundColor='white'
                            showRating
                            ratingCount={5}
                            onFinishRating={ratingCompleted}
                            style={{ paddingVertical: 10 }}
                            startingValue={0}
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: ('1%') }}>
                        <View style={styles.description}>
                            <TextInput
                                placeholder={'Write your review'}
                                multiline
                                numberOfLines={10}
                            // onChangeText={(value: any) => { setClaimDetail(value) }}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: '7%' }}>
                        <Button
                            title="SAVE"
                            onPress={uploadData}
                            loading={isloading}
                        />
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    imgview: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: hp(1)
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        backgroundColor: 'white',
    },
    description: {
        height: hp("20%"),
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(2),
        borderWidth: 1,
        width: wp('60%')
    },
});