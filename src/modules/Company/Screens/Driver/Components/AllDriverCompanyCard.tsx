import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { backendUrl } from '../../../../../appConstants';
import { profile } from '../../../../../assets';
import { Avatar } from 'react-native-elements';
export const AllDriverCompanyCard = ({
    onPress,
    firstName,
    lastName,
    myImage,
    email,
    deletePress,
    status,
    show,
    assignPress,
    bookingDetailsPress,
    viewDriverDetailsPress,
    assignShow
}: any) => {
    console.log("nothing")
    return (
        <View>
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={onPress}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={styles.deleteSvgContainer}>
                                {show ?
                                    <TouchableOpacity onPress={deletePress} >
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                                {assignShow ?
                                    <TouchableOpacity onPress={assignPress}
                                        style={{ backgroundColor: 'red', width: 70, alignItems: 'center', borderRadius: 25, height: 25 }} >
                                        <Text style={{ color: 'white' }}>Assign</Text>
                                    </TouchableOpacity> : null
                                }

                            </View>
                        </View>
                        <View style={styles.top}>
                            <View style={styles.topLeft}>
                                {myImage ? (
                                    <Image
                                        style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}
                                        source={{ uri: backendUrl + myImage }}
                                    />
                                ) : (
                                    <Avatar
                                        size={110}
                                        rounded
                                        icon={{ name: "person", color: 'grey', size: 60 }}
                                        containerStyle={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}
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
                                </View>
                                <View>
                                    <Text>
                                        {email}
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.lastPart}>
                            <View style={styles.acceptAndRejectContainer}>
                                <Text style={styles.acceptText} >
                                    {status}
                                </Text>
                            </View>
                            <View>

                                <TouchableOpacity onPress={viewDriverDetailsPress}>
                                    <Text style={{ color: 'green' }}>Driver Details</Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                </TouchableOpacity>

            </View>
            <View>
                <TouchableOpacity onPress={bookingDetailsPress}
                    style={styles.buttonContainer}>
                    <Text style={styles.detailsText}>
                        VIEW DETAILS
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        borderRadius: 10,
        margin: 5,
        marginBottom: 0,
        padding: 12,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0

    },
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
        marginBottom: 1,
    },
    topLeft: { flex: 1 },
    topRight: {
        flex: 3.35,
        marginLeft: 10
    },
    bottom: {
        marginTop: 15,
        flexDirection: 'row',
    },

    bottomLeft: {
        flex: 0.6,
    },
    bottomMid: {
        justifyContent: 'space-between',
        flex: 2.0,
    },
    bottomRight: {
        justifyContent: 'space-between',
        flex: 1.0,
    },
    lastPart: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    acceptAndRejectContainer: {
        flexDirection: 'row',
    },
    acceptText: {
        color: '#1B8B18',
        fontSize: 15,
        marginRight: 30,
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
        fontSize: 15,
        fontWeight: '600'
    },
    titleText: {
        fontSize: 21,
    },
    subTitleText: {
        fontSize: 17,
    },
    deleteSvgContainer: {
        flexDirection: 'row-reverse',
        marginBottom: 10,
        alignSelf: 'flex-end',
        marginLeft: 10
    },
    buttonContainer: {
        backgroundColor: 'red',
        alignItems: 'center',
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        height: 50,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    detailsText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 6
    }

});
// export default AllDriverCompanyCard;