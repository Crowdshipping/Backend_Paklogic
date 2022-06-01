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

import { SafeAreaView } from 'react-native-safe-area-context';
import { homeSvg } from '../theme/assets/svg/homeSvg';
import { settingSvg } from '../theme/assets/svg/settingSvg';
import { logoutSvg } from '../theme/assets/svg/logoutSvg';
import { notificationSvg } from '../theme/assets/svg/notificationSvg';
import { yourpkgSvg } from '../theme/assets/svg/yourpkgSvg';
import { claimSvg } from '../theme/assets/svg/claimSvg';
import { supportSvg } from '../theme/assets/svg/supportSvg';
import { clockSvg } from '../theme/assets/svg/clockSvg';
import { flightSvg } from '../theme/assets/svg/flightSvg';
import { ship } from '../theme/assets/svg/shipSvg';
import { ship2Svg } from '../theme/assets/svg/ship2Svg';
// import {homeicon} from '../theme/svg/homeicon';
// import {yourpkgicon} from '../theme/svg/yourpkgicon';
// import {claimicon} from '../theme/svg/claimicon';
// import {setting} from '../theme/svg/setting';
// import {notificationicon} from '../theme/svg/notificationicon';
// import {supporticon} from '../theme/svg/supporticon';
// import {logouticon} from '../../theme/svg/logouticon';
const DrawerSideScreen = ({ navigation }: any) => {
    const [pdetail, setpdetail] = useState({
        name: 'Tony Stark',
        email: 'tony@gmail.com',
        location: 'United States of America',
    });
    return (
        <SafeAreaView>
            <View style={styles.ViewTop}>
                <Image
                    source={require('../assets/tony.jpg')}
                    style={styles.img}
                />
                <View style={{ paddingTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                        {pdetail.name}
                    </Text>
                    <Text style={{ fontSize: 18, color: 'white' }}>{pdetail.email}</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MYPROFILE');
                    }}>
                        <Text style={{ fontSize: 18, color: 'yellow' }}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ViewDetails}>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml xml={homeSvg} width={25} />
                    <Text style={styles.txtdetail}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('AllFlight');
                }} style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={flightSvg} width={25} />
                    <Text style={styles.txtdetail}>Manage Flights</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ALLSHIPS');
                }} style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={ship2Svg} width={25} />
                    <Text style={styles.txtdetail}>Manage Ships</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={yourpkgSvg} width={25} />
                    <Text style={styles.txtdetail}>Your Package</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={clockSvg} width={25} />
                    <Text style={styles.txtdetail}>Booking History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={claimSvg} width={25} />
                    <Text style={styles.txtdetail}>Claim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={supportSvg} width={25} />
                    <Text style={styles.txtdetail}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={settingSvg} width={25} />

                    <Text style={styles.txtdetail}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={notificationSvg} width={25} />
                    <Text style={styles.txtdetail}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={logoutSvg} width={25} />
                    <Text style={styles.txtdetail}>Logout</Text>
                </TouchableOpacity>

                {/* <View style={{borderBottomWidth: 1}}></View> */}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingTop: hp(3),
    },
    //   imgview: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     top: hp(3),
    //   },
    img: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "red"
    },
    ViewTop: {
        alignItems: 'center',
        backgroundColor: 'red',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    svg: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    ViewDetails: {
        paddingTop: hp(5),
        paddingHorizontal: hp(5),
        // height: '75%',
    },
    viewunderline: {
        flexDirection: 'row',
        paddingVertical: hp(1),
        alignItems: 'center',
    },
    txtdetail: {
        fontSize: 18,
        paddingLeft: wp(5),
        color: 'black',
        textAlign: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
    },
});
export default DrawerSideScreen;