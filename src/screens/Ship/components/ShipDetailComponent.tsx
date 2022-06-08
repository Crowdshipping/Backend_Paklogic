import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { backendUrl } from '../../../appConstants';
const ShipDetailComponent = ({
    onPressEdit,
    departureSeaport,
    destinationSeaport,
    date,
    departureTime,
    destinationTime,
    myTicketImage,
    mmsiNumber
}: any) => {

    return (
        <View style={styles.cardView}>
            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>Departure Seaport </Text>
                </View>
                <View style={styles.rowValue}>
                    <Text> {departureSeaport} </Text>
                </View>
            </View>
            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>Destination Seaport </Text>
                </View>
                <View style={styles.rowValue}>
                    <Text> {destinationSeaport} </Text>
                </View>
            </View>

            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>Date</Text>
                </View>
                <View style={styles.rowValue}>
                    <Text> {date} </Text>
                </View>
            </View>
            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>Departure Time</Text>
                </View>
                <View style={styles.rowValue}>
                    <Text> {departureTime} </Text>
                </View>
            </View>
            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>Destination Time</Text>
                </View>
                <View style={styles.rowValue}>
                    <Text>{destinationTime}</Text>
                </View>
            </View>
            <View style={styles.singleRow}>
                <View style={styles.rowKey}>
                    <Text>MMSI No.</Text>
                </View>
                <View style={styles.rowValue}>
                    <Text> {mmsiNumber} </Text>
                </View>
            </View>

            <View style={styles.bottomImage}>
                {myTicketImage ? (
                    <Image style={{ width: '80%', height: 100 }} source={{ uri: backendUrl + myTicketImage }} />
                ) : (
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                        source={require('../../../assets/tony.jpg')}
                    />
                )}

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
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
    singleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 8,
    },
    rowKey: {
        flex: 0.5,
    },
    rowValue: {
        flex: 0.5,
        borderBottomWidth: 0.3,
    },
    bottomImage: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ShipDetailComponent;
