import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { backendUrl } from '../../../../appConstants';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import { LocationSvg } from '../../../../theme/assets/svg/LocationSvg';
import MineCard from '../../../Common/MineCard';
const RequestCard = ({
    onPress,
    firstName,
    lastName,
    mmsiOrFlightNumber,
    departurePort,
    destinationPort,
    acceptPress,
    rejectPress,
    date,
    myImage,
    isAccepted,
    isPostRequest,
    isForShip,
}: any) => {
    return (
        <MineCard>
            <TouchableOpacity onPress={onPress}>
                <View>
                    {console.log('requestcomimag', myImage)}
                    <View style={styles.top}>
                        <View style={styles.topLeft}>
                            {myImage ? (
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                                    source={{ uri: backendUrl + myImage }}
                                />
                            ) : (
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                                    source={require('../../../../assets/aeroplane.png')}
                                />
                            )}
                        </View>
                        <View style={styles.topRight}>
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <Text style={styles.titleText}>
                                    {firstName + '\t' + lastName}
                                </Text>
                                {isForShip ? <Text style={styles.subTitleText}>MMSINumber: {mmsiOrFlightNumber}</Text> :
                                    <Text style={styles.subTitleText}>FlightNumber: {mmsiOrFlightNumber}</Text>
                                }
                            </View>
                        </View>
                    </View>
                    <HorizontalDivider />
                    <View style={styles.bottom}>
                        <View style={styles.bottomLeft}>
                            <SvgXml xml={LocationSvg} width={50} height={80} />
                        </View>
                        <View style={styles.bottomMid}>
                            <Text style={styles.countryText}>{departurePort}</Text>
                            <Text style={styles.countryText}>{destinationPort}</Text>
                        </View>
                        <View style={styles.bottomRight}>
                            <TouchableOpacity onPress={acceptPress}>
                                <Text style={styles.acceptText} >
                                    {isAccepted ? 'Accepted' : 'Accept'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={rejectPress} >

                                <Text onPress={rejectPress} style={styles.rejectText} >
                                    {isAccepted || isPostRequest ? '' : 'Reject'}
                                </Text>

                            </TouchableOpacity>
                            <Text style={styles.dateText}>{date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </MineCard>
    );
};
const styles = StyleSheet.create({
    card: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: 'white',
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
        elevation: 5,
    },
    top: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    topLeft: { flex: 1 },
    topRight: { flex: 3.35 },
    bottom: {
        marginTop: 15,
        flexDirection: 'row',
    },
    bottomLeft: {
        flex: 1.0,
    },
    bottomMid: {
        justifyContent: 'space-between',
        flex: 2.0,
    },
    bottomRight: {
        justifyContent: 'space-between',
        flex: 1.0,
    },
    acceptText: {
        color: '#1B8B18',
        fontSize: 15,
    },
    rejectText: {
        color: '#DC3E3E',
        fontSize: 15,
        fontWeight: 'bold'
    },
    dateText: {
        color: '#A19B9B',
        fontSize: 15,
    },
    countryText: {
        fontSize: 13,
        fontWeight: '600'
    },
    titleText: {
        fontSize: 21,
    },
    subTitleText: {
        fontSize: 17,
    },
});
export default RequestCard