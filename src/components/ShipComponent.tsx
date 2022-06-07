import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { airplane } from '../theme/assets/svg/airplaneSvg';
import { DeleteSvg } from '../theme/assets/svg/DeleteSvg';

const ShipComponent = ({
    onPressEdit,
    departureSeaPort,
    destinationSeaPort,
    date,
    departureTime,
    destinationTime,
    mmsiNumber,
    myImage,
    leftSvg,
    onDeletePress,
}: any) => {
    { console.log("myimagefrom ship component", myImage); }
    return (
        <View style={styles.cardView}>
            <TouchableOpacity onPress={onDeletePress}>
                <View style={{ flexDirection: 'row-reverse', marginBottom: 10 }}>
                    <SvgXml xml={DeleteSvg} width={20} height={20} />
                </View>
            </TouchableOpacity>
            <View style={styles.topView}>
                <View style={styles.left}>
                    <SvgXml xml={leftSvg} width={60} />
                </View>
                <View style={styles.right}>
                    <View style={styles.singleTextRowView}>
                        <Text style={{ marginRight: 18 }}>Departure Seaport</Text>
                        <Text style={{ flex: 1, flexWrap: 'wrap' }}>{departureSeaPort}</Text>
                    </View>
                    <View style={styles.singleTextRowView}>
                        <Text style={{ marginRight: 18 }}>Destination Seaport</Text>
                        <Text style={{ flex: 1, flexWrap: 'wrap' }}>
                            {destinationSeaPort}
                        </Text>
                    </View>
                    <View style={styles.singleTextRowView}>
                        <Text>Date</Text>
                        <Text>{date}</Text>
                    </View>
                    <View style={styles.singleTextRowView}>
                        <Text>Departure Time</Text>
                        <Text>{departureTime}</Text>
                    </View>
                    <View style={styles.singleTextRowView}>
                        <Text>Destination Time</Text>
                        <Text>{destinationTime}</Text>
                    </View>
                    <View style={styles.singleTextRowView}>
                        <Text>MMSI Number</Text>
                        <Text>{mmsiNumber}</Text>
                    </View>

                </View>
            </View>
            <View style={styles.bottomView}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 200, height: 100 }} source={{ uri: myImage }} />
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.left}></View>
                <View style={styles.lastTextRow}>
                    {/* <Text style={styles.lastTextStyle}>Completed</Text> */}
                    {/* <Text onPress={onPressEdit} style={styles.lastTextStyle}>
            Edit
          </Text> */}
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    // cardView: {
    //   paddingHorizontal: 20,
    //   paddingVertical: 30,
    //   marginTop: 25,
    //   width: '100%',
    //   borderRadius: 12,
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 2,
    //   marginBottom: 25,
    // },
    cardView: {
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
    topView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    bottomView: { flex: 1, paddingVertical: 10 },
    left: { flex: 1 },
    right: { flex: 2.5 },
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

export default ShipComponent;
