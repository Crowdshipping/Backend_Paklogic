import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { backendUrl } from '../../../../../appConstants';
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import { LocationSvg } from '../../../../../theme/assets/svg/LocationSvg';
import { areoplane } from '../../../../../assets';
import MineCard from '../../../../../screens/Common/MineCard';
export const AllDriverCompanyCard= ({
    onPress,
    firstName,
    lastName,
    myImage,
    email,
    deletePress,
    status,
    show,
    assignPress
}: any) => {
    console.log("nothing")
    return (
        <MineCard>
            <TouchableOpacity onPress={onPress}>
                <View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <View style={styles.deleteSvgContainer}>
                        {show ? 
                        <TouchableOpacity onPress={deletePress} >
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={assignPress}
                        style={{backgroundColor:'red',width:70,alignItems:'center',borderRadius:25,height:25}} >
                            <Text style={{color:'white'}}>Assign</Text>
                        </TouchableOpacity>
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
                                <Image
                                    style={{ width:70, height: 70, borderRadius: 50, marginRight: 10 }}
                                    source={areoplane}
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
                    {/* <View style={styles.bottom}>
                        <View style={styles.bottomLeft}>
                            <SvgXml xml={LocationSvg} width={50} height={80} />
                        </View>
                        <View style={styles.bottomMid}>
                            <Text style={styles.countryText}>{departurePort}</Text>
                            <Text style={styles.countryText}>{destinationPort}</Text>
                        </View>
                    </View> */}
                    <View style={styles.lastPart}>
                        <View style={styles.acceptAndRejectContainer}>
                            <Text style={styles.acceptText} >
                                {status}
                            </Text>

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
        marginBottom: 1,
    },
    topLeft: { flex: 1 },
    topRight: { flex: 3.35,
                marginLeft:10
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
        marginLeft:10
    },
});
// export default AllDriverCompanyCard;