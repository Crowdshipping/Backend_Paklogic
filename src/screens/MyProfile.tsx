import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { settingSvg } from '../theme/assets/svg/settingSvg';
import { location2Svg } from '../theme/assets/svg/location2Svg';
import { mailSvg } from '../theme/assets/svg/mailSvg';
import { profileSvg } from '../theme/assets/svg/profileSvg';
const MyProfile = ({ navigation }: any) => {
    const [pdetail, setpdetail] = useState({
        name: 'Roma',
        email: 'roma1996@gmail.com',
        location: 'Pakistan',
    });
    return (
        <SafeAreaView>
            <View style={styles.ViewTop}>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                        top: hp(-1),
                    }}
                    // resizeMode={'stretch'}
                    source={require('../assets/PROFILEpic.png')}>
                    <View style={styles.header}>
                        <Header
                            title="My Profile"
                            onPress={() => {
                                navigation.navigate("Drawer")
                                console.log('Error in Go Back');
                            }}
                        />
                    </View>
                    <View style={styles.imgview}>
                        <Image
                            source={require('../assets/tony.jpg')}
                            style={styles.img}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.ViewDetails}>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml
                            // style={styles.svg}
                            xml={profileSvg}
                            width={25}
                        // width={75}
                        // height={75}
                        />
                    </View>
                    <View style={{ paddingLeft: wp(5) }}>
                        <Text style={styles.txtdetail}>{pdetail.name}</Text>
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(5) }}>
                        <Text style={styles.txtdetail}>{pdetail.email}</Text>
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={location2Svg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(5) }}>
                        <Text style={styles.txtdetail}>{pdetail.location}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: hp(1),
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View>
                            <SvgXml style={styles.svg} xml={settingSvg} width={25} />
                        </View>
                        <View style={{ paddingLeft: wp(5) }}>
                            <Text style={styles.txtdetail}>Setting</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity>
                            <AntDesign
                                name="right"
                                color={'#000'}
                                size={wp(5)}
                                onPress={() =>
                                    navigation.dispatch(DrawerActions.openDrawer())
                                }
                            // onPress={() => console.log('adasdsefsssd')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={{borderBottomWidth: 1}}></View> */}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
    },
    imgview: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    },
    ViewTop: {
        // borderWidth: 2,
        // marginHorizontal: hp(3),
        height: '25%',
    },
    svg: {
        // borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    ViewDetails: {
        // borderWidth: 2,
        paddingTop: hp(10),
        paddingHorizontal: hp(5),
        height: '75%',
    },
    viewunderline: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: hp(1),
        // justifyContent: 'center',
        alignItems: 'center',
        // width: wp(25),
        // justifyContent: 'space-between',
    },
    txtdetail: {
        fontSize: 18,
    },
});
export default MyProfile;