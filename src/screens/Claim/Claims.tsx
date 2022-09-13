import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ClaimSingleCard from './ClaimSingleCard';
import { getClaims } from '../../API';
import { CheckBoxState, Header } from '../../components'
import { colors } from '../../theme';
import { useIsFocused } from '@react-navigation/native';

const Claims = ({ navigation }: any) => {
    const [claimResponse, setClaimResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [assignShow, setAssignShow] = React.useState(false);
    // const [isDisabled, setDisabled] = React.useState(false);
    const [pending, setPending] = React.useState(false);
    const [resolved, setResolved] = React.useState(true);
    const isfocus = useIsFocused();
    function getData() {
        setIsLoading(true);
        getClaims()
            .then((result: any) => {
                setIsLoading(false);
                if (result.success) {
                    setClaimResponse(result.claims);
                }
                console.log(claimResponse)
                console.log('Fvehicle', result);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error', error);
            });
    }

    useEffect(() => {
        if (isfocus) {
            getData();
        }
    }, [isfocus]);

    const renderClaim = (item: any) => {
        return (
            <ClaimSingleCard
                onPress={() => {
                    navigation.navigate("ClaimDetail", { item })
                }}
                state={item.claimStatus}
                title={item.claimTitle}
                subtitle={item.claimDescription} />
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <Header
                    title={'Claims'}
                    pressMethod={() => {
                        navigation.goBack()
                    }}
                />
                {isLoading ? <View
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
                </View> : <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("AddClaim")
                    }} style={styles.addbtn}>
                        <Text style={styles.txt}>ADD NEW</Text>
                    </TouchableOpacity>
                    <View style={styles.radio}>
                        <CheckBoxState
                            text={'Resolved'}
                            onPress={() => { setResolved(!resolved) }}
                            checked={true}
                        />
                        <CheckBoxState text={'Pending'} onPress={() => { setPending(!pending) }} />
                    </View>

                    {claimResponse && claimResponse.length > 0 ?
                        claimResponse.map((item: any) => {
                            if (pending === true && item.claimStatus === 'Pending') {
                                console.log(item.claimStatus)
                                return renderClaim(item)
                            }
                            if (resolved === true && item.claimStatus === 'Resolved') {
                                return renderClaim(item)
                            }
                        }) : <View
                            style={{
                                backgroundColor: colors.boxBackground,
                                // backgroundColor: 'aqua',
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
                                    fontSize: 16,
                                }}>
                                No claims available
                            </Text>
                        </View>}
                </View>}

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    txt: {
        color: 'black',
        fontSize: 16,
    },
    radio: {
        width: '60%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    addbtn: {
        borderRadius: hp(2),
        paddingHorizontal: hp(0.5),
        paddingVertical: hp(1),
        alignItems: 'center',
        // justifyContent: 'center',
        width: wp(25),
        borderWidth: 1,
        alignSelf: 'flex-end',
    },
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
    },
    txtheading: {
        color: 'black',
        fontSize: 22,
        paddingVertical: hp(2),
    },



});
export default Claims;