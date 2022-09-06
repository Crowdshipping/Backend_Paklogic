import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { getUser } from '../../API';
import { Header } from '../../components';
import { SvgXml } from 'react-native-svg';
import { background, profile } from '../../theme/assets/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { prodUrl } from '../../appConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    camera,
    locationicon,
    mailicon,
    setting,
} from '../../theme/assets/svg';
import { colors } from '../../theme';
import { profileicon } from '../../theme/assets/svg/profileicon';
import { styles } from './style';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewProfile = ({ navigation, route }: any) => {
    const [loading, setloading] = useState(false);
    const [profileData, setprofileData] = useState<any>({});
    const isfocus = useIsFocused();
    function fetchProfileData() {
        getUser()
            .then(async (rest: any) => {
                setloading(false);
                setprofileData(rest.user);
                if (route?.params?.isEdited) {
                    try {
                        await AsyncStorage.setItem('@userName', rest.user.firstname + ' ' + rest.user.lastname);
                        await AsyncStorage.setItem('@useerPic', rest.user.profilepic);
                    } catch (e) {
                        console.log('error', e);
                    }
                }
            })
            .catch(error => {
                Alert.alert(error.message ? error.message : 'Something went wrong');
            })
    }
    useEffect(() => {
        if (isfocus) {
            fetchProfileData()
        }
        console.log('dwfklaf jfowel;w', route?.params?.isEdited)
    }, [isfocus]);
    return (
        <SafeAreaView>
            {loading ? (
                <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                />
            ) : (
                <View style={{}}>
                    <View style={styles.ViewTop}>
                        <ImageBackground
                            resizeMode="stretch"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={background}>

                            <Header
                                title="My Profile"
                                pressMethod={() => {
                                    navigation.goBack()
                                    console.log('Error in Go Back');
                                }}
                                color={colors.white}
                            />
                            {profileData && console.log('profile data console', profileData)}
                            <View style={styles.imgview}>
                                {profileData.profilepic ? (
                                    <Image
                                        source={{
                                            uri: prodUrl + profileData.profilepic,
                                        }}

                                        style={styles.img}
                                    />
                                ) : <Image
                                    source={profile}
                                    style={styles.img}
                                />}
                                {/* <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: hp(15),
                                        right: wp(5),
                                        // backgroundColor: 'yellow',
                                    }}>
                                    <SvgXml style={styles.CameraSvg} xml={camera} width={30} />
                                </TouchableOpacity> */}
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.ViewDetails}>
                        <View style={styles.editContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditProfile', { profileData })}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>
                            Name
                        </Text>
                        <View style={styles.viewunderline}>
                            <SvgXml style={styles.svg} xml={profileicon} width={25} />
                            <View style={{ paddingLeft: wp(3.5) }}>
                                <Text style={styles.txtdetail}>
                                    {profileData?.firstname ? profileData.firstname : 'First name'} {profileData?.lastname ? profileData?.lastname : "Last name"}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.label}>
                            Email
                        </Text>
                        <View style={styles.viewunderline}>
                            <SvgXml style={styles.svg} xml={mailicon} width={25} />
                            <View style={{ paddingLeft: wp(3.5) }}>
                                <Text style={styles.txtdetail}>{profileData?.email ? profileData?.email : 'Email'}</Text>
                            </View>
                        </View>
                        <Text style={styles.label}>
                            Address
                        </Text>
                        <View style={styles.viewunderline}>
                            <SvgXml style={styles.svg} xml={locationicon} width={25} />
                            <View style={{ paddingLeft: wp(3.5) }}>
                                <Text style={styles.txtdetail}>{profileData?.address}</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                paddingVertical: hp(1),
                                justifyContent: 'space-between',
                                marginTop: 20
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <SvgXml style={styles.svg} xml={setting} width={25} />
                                <View style={{ paddingLeft: wp(5) }}>
                                    <Text style={styles.txtdetail}>Setting</Text>
                                </View>
                            </View>

                            <TouchableOpacity>
                                <AntDesign
                                    name="right"
                                    color={colors.black}
                                    size={wp(5)}
                                // onPress={() =>
                                //     navigation.dispatch(DrawerActions.openDrawer())
                                // }
                                // onPress={() => console.log('adasdsefsssd')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
        // <SafeAreaView></SafeAreaView>
    );
};



export default ViewProfile;
