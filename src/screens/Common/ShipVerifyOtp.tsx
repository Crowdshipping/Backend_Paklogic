import React, { useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

import { Button } from '../../components';
import { vehicleResendOtp, vehicleVerifyOtp } from '../../services';
import { register5 } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';

const ShipVerifyOtp = ({ route, navigation }: any) => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [num3, setNum3] = useState('');
    const [num4, setNum4] = useState('');
    const [num5, setNum5] = useState('');
    const [num6, setNum6] = useState('');

    const { shipData } = route.params;
    const [random, SetRandom] = useState(Math.random());
    const [counter, SetCounter] = useState(30);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const refNum1: any = useRef();
    const refNum2: any = useRef();
    const refNum3: any = useRef();
    const refNum4: any = useRef();
    const refNum5: any = useRef();
    const refNum6: any = useRef();

    const Validate = () => {
        if (
            num1.length == 1 &&
            num2.length == 1 &&
            num3.length == 1 &&
            num4.length == 1 &&
            num5.length == 1 &&
            num6.length == 1
        ) {
            console.log("successfull")
            setLoading(true);
            vehicleVerifyOtp(num1 + num2 + num3 + num4 + num5 + num6)
                .then(response => response.json())
                .then(result => {
                    setLoading(false);
                    console.log("ottttttppppp", result)
                    if (result.success) {
                        Alert.alert("", result.message, [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate("PICKEDUPFORSHIP", {
                                        isOtpVerify: true,
                                        shipData: shipData
                                    })
                                },
                                style: 'cancel',
                            },
                        ]);
                    } else {
                        Alert.alert('ERROR', result.message);
                    }
                    console.log(result);
                })
                .catch(error => {
                    setLoading(false);
                    Alert.alert('ERROR', 'something went wrong');
                });
        } else {
            Alert.alert('ERROR', 'Please enter valid OTP code');
        }
    };

    const resendCode = () => {
        refNum1.current.clear();
        refNum2.current.clear();
        refNum3.current.clear();
        refNum4.current.clear();
        refNum5.current.clear();
        refNum6.current.clear();
        SetRandom(Math.random());
        SetCounter(60);
        setDisabled(true);
        vehicleResendOtp(shipData._id)
            .then(response => response.json())
            .then(result => {
                console.log("popopopopop", result);
                if (result.success) {
                    Alert.alert("", result.message);
                } else {
                    Alert.alert("", result.message);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            {console.log("ship data from verify otps", shipData)}
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <SvgXml
                            xml={register5}
                            width={widthPercentageToDP(90)}
                            height={hp(50)}
                        />
                        <Text>
                            Enter the OTP code send to you at
                            {/* {props.route.params.countrycode.dial_code +
                                props.route.params.phoneno} */}
                        </Text>
                        <View style={styles.codeContainer}>
                            <TextInput
                                ref={refNum1}
                                autoCapitalize={'none'}
                                value={num1}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length <= 1) {
                                        setNum1(text);
                                        refNum2.current.focus();
                                    }
                                }}
                            />

                            <TextInput
                                ref={refNum2}
                                autoCapitalize={'none'}
                                value={num2}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length <= 1) {
                                        setNum2(text);
                                        refNum3.current.focus();
                                    }
                                }}
                            />

                            <TextInput
                                ref={refNum3}
                                autoCapitalize={'none'}
                                value={num3}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length <= 1) {
                                        setNum3(text);
                                        refNum4.current.focus();
                                    }
                                }}
                            />

                            <TextInput
                                ref={refNum4}
                                autoCapitalize={'none'}
                                value={num4}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length <= 1) {
                                        setNum4(text);
                                        refNum5.current.focus();
                                    }
                                }}
                            />

                            <TextInput
                                ref={refNum5}
                                autoCapitalize={'none'}
                                value={num5}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length <= 1) {
                                        setNum5(text);
                                        refNum6.current.focus();
                                    }
                                }}
                            />

                            <TextInput
                                ref={refNum6}
                                autoCapitalize={'none'}
                                value={num6}
                                style={styles.textInput}
                                placeholder="-"
                                placeholderTextColor={'grey'}
                                onChangeText={text => {
                                    if (text.length > 1) return;
                                    setNum6(text);
                                }}
                            />
                        </View>
                        {disabled ? (
                            <CountDown
                                key={random}
                                until={counter}
                                size={12}
                                onFinish={() => {
                                    setDisabled(false);
                                }}
                                separatorStyle={{ color: colors.red }}
                                digitStyle={{}}
                                digitTxtStyle={{ color: colors.red }}
                                timeToShow={['M', 'S']}
                                showSeparator
                                timeLabels={{ m: '', s: '' }}
                                style={{ marginVertical: hp(3) }}
                            />
                        ) : (
                            <Text
                                style={{ alignSelf: 'center', marginVertical: hp(3) }}
                                onPress={() => {
                                    resendCode();
                                }}>
                                Resend Code
                            </Text>
                        )}
                        <Button
                            loading={loading}
                            title="NEXT"
                            onPress={Validate}
                            containerStyle={{ width: widthPercentageToDP(80) }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    textInput: {
        ...Platform.select({
            ios: {
                // paddingHorizontal: wp(1.5),
                paddingVertical: hp(1.3),
            },
            android: {},
        }),
        borderColor: 'grey',
        borderRadius: widthPercentageToDP(2),
        // borderWidth: 1,
        elevation: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: widthPercentageToDP(12),
        paddingLeft: widthPercentageToDP(5),
        shadowOffset: {
            width: 1,
            height: -1,
        },
        shadowOpacity: .3,
        shadowRadius: widthPercentageToDP(2),
        shadowColor: 'black',
    },
    codeContainer: {
        flexDirection: 'row',
        // backgroundColor: 'grey',
        width: widthPercentageToDP(80),
        alignSelf: 'center',
        justifyContent: 'space-around',
        marginTop: widthPercentageToDP(5)
    },
});
export default ShipVerifyOtp;
