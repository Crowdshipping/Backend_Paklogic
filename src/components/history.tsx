import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../theme';
import { plane, shipsvg, truck } from '../theme/assets/svg';
import { BookingListCard } from './bookingListCard';
import { useNavigation } from '@react-navigation/native';

export const History = (props: any) => {
    const { isLoading, data } = props
    const [prev, setprev] = useState(0)
    const [next, setnext] = useState(10)
    const scrollRef = useRef<ScrollView>(null);
    const navigation = useNavigation()
    return (
        <View>
            {isLoading ? (
                <View
                    style={{
                        // backgroundColor: colors.boxBackground,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // paddingVertical: hp(10),
                        // paddingHorizontal: wp(10),
                        // borderRadius: hp(2),
                    }}>
                    <ActivityIndicator size={'small'} color={colors.red} />
                </View>
            ) : (
                data.length > 0 ?
                    <ScrollView ref={scrollRef} style={{ height: '90%' }}>
                        {data.slice(prev, next).map((item: any, index: number) => {
                            return (
                                item.request.bookingId &&
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('HistoryDetail', { item })}>

                                    <BookingListCard
                                        key={index}
                                        svg={
                                            item.request.type === 'Flight'
                                                ? plane
                                                : item.request.type === 'Ship'
                                                    ? shipsvg
                                                    : item.request.type === 'Land'
                                                        ? truck
                                                        : ''
                                        }
                                        firstname={item?.request?.provider?.firstname}
                                        lastname={item?.request?.provider?.lastname}
                                        mmsi={
                                            item.request.type === 'Flight'
                                                ? 'Flight No'
                                                : item.request.type === 'Ship'
                                                    ? 'MMSI'
                                                    : item.request.type === 'Land'
                                                        ? 'Vehicle Type'
                                                        : ''
                                        }
                                        mmsiNumber={
                                            item.request.type === 'Flight'
                                                ? item?.request?.flight?.flightNumber
                                                : item.request.type === 'Ship'
                                                    ? item.request.ship.mmsiNumber
                                                    : item.request.type === 'Land' && item.request.bookingId?.vehicleType
                                        }
                                        pickupCity={
                                            item.request.type === 'Flight'
                                                ? item?.request?.flight?.pickupCity
                                                : item.request.type === 'Ship'
                                                    ? item.request.ship.pickupCity
                                                    : item.request.type === 'Land' &&
                                                    item.request.bookingId?.pickupAddressText
                                        }
                                        dropoffCity={
                                            item.request.type === 'Flight'
                                                ? item?.request?.flight?.dropoffCity
                                                : item.request.type === 'Ship'
                                                    ? item.request.ship.dropoffCity
                                                    : item.request.type === 'Land' && item.request.bookingId?.dropAddressText
                                        }
                                        price={'30$'}
                                        requestText={
                                            item?.request?.status === 'Accepted'
                                                ? item?.request?.state
                                                    ? item?.request?.state
                                                    : 'Not Picked'
                                                : item?.request?.status
                                        }
                                        buttonText={
                                            item.request.isMakePayment === false
                                                ? 'Payment Pending'
                                                : 'Live Tracking'
                                        }
                                        btn={
                                            item.request.isMakePayment === false
                                                ? true
                                                : item.request.state === 'Reached' || item.request.state === undefined || item.request.state === 'Completed'
                                                    ? false
                                                    : true
                                        }
                                        btn1={
                                            item.request.status === 'Pending' ? true : false
                                            // true
                                        }
                                        // handleNavigation={() => { }}
                                        handleCancellation={() => {
                                            console.log('item?.request?.bookingId?._id', item?.request?._id)
                                            // setLoading(true)

                                            Alert.alert('Alert!', 'Are you sure you want to cancel request?', [
                                                {
                                                    text: 'Yes',
                                                    onPress: () => handleCancelEvent(item?.request?._id),
                                                },
                                                {
                                                    text: 'No',
                                                    onPress: () => null,
                                                    style: 'cancel',
                                                }])
                                        }}
                                        handleTracking={() => {
                                            item.request.isMakePayment === false
                                                ? navigation.navigate('StripePayment', {
                                                    item: {
                                                        requestId: item.request._id,
                                                        amount: 30,
                                                    },
                                                })
                                                : item.request.state === 'Reached' || item.request.state === undefined
                                                    ? false
                                                    : item?.request?.type === 'Flight'
                                                        ? navigation.navigate('TrackFlight', {
                                                            fa_flight_id: item?.request?.flight?.fa_flight_id,
                                                            flightarrivalDate: item?.request?.flight?.flightarrivalDate,
                                                            departureAirport: item?.request?.flight?.departureAirport,
                                                            destinationAirport:
                                                                item?.request?.flight?.destinationAirport,
                                                        })
                                                        : item?.request?.type === 'Ship'
                                                            ? navigation.navigate('TrackShip', {
                                                                mmsiNumber: item?.request?.ship?.mmsiNumber,
                                                                eta: item?.request?.ship?.eta,
                                                                pickupAddress: item?.request?.bookingId?.pickupAddress,
                                                                dropAddress: item?.request?.bookingId?.dropAddress,
                                                            }) : item?.request?.type === 'Land'
                                                                ? navigation.navigate('TrackLand', {
                                                                    driverID: item?.request?.provider?._id,
                                                                    pickupAddress: item?.request?.bookingId?.pickupAddress,
                                                                    dropAddress: item?.request?.bookingId?.dropAddress,
                                                                })
                                                                : null;
                                        }}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                        {data.length > 10 &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>

                                <TouchableOpacity
                                    disabled={prev === 0 ? true : false}
                                    style={{
                                        borderRadius: wp(2),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.red,
                                    }}
                                    onPress={() => {
                                        setprev(prev - 10)
                                        setnext(next - 10)
                                        scrollRef.current?.scrollTo({
                                            y: 0,
                                            animated: true
                                        });
                                    }}>
                                    <Text
                                        style={{
                                            marginVertical: wp(1.5),
                                            marginHorizontal: wp(2),
                                            color: colors.white,
                                        }}>
                                        Prev
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={next >= data.length ? true : false}
                                    style={{
                                        borderRadius: wp(2),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.red,
                                    }}
                                    onPress={() => {
                                        setnext(next + 10)
                                        setprev(prev + 10)
                                        scrollRef.current?.scrollTo({
                                            y: 0,
                                            animated: true
                                        });
                                    }}>
                                    <Text
                                        style={{
                                            marginVertical: wp(1.5),
                                            marginHorizontal: wp(2),
                                            color: colors.white,
                                        }}>
                                        Next
                                    </Text>
                                </TouchableOpacity>
                            </View>}
                    </ScrollView>
                    : <View
                        style={{
                            backgroundColor: colors.boxBackground,
                            alignSelf: 'center',
                            paddingVertical: hp(10),
                            marginVertical: '50%',
                            paddingHorizontal: wp(10),
                            borderRadius: hp(2),
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: colors.red,
                                fontSize: hp(2),
                            }}>
                            Sorry no bookings available
                        </Text>
                    </View>
            )}
        </View>
    )
}