import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import ClaimSingleCard from './ClaimSingleCard';

const Claim = ({ navigation }: any) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ADDCLAIM")
                    }} style={styles.addbtn}>
                        <Text style={styles.txt}>ADD NEW</Text>
                    </TouchableOpacity>
                    <View style={styles.radio}>
                        <CheckBoxState text={'Resolved'} whenPressed={() => { }} />
                        <CheckBoxState text={'Pending'} whenPressed={() => { }} />
                    </View>
                    <ClaimSingleCard onPress={() => {
                        navigation.navigate("CLAIMDETAIL")
                    }} state={"Resolved"} title={'Customer misbehave with me'} subtitle={"Customer treatement was very unfair with me"} />
                    <ClaimSingleCard onPress={() => {
                        navigation.navigate("CLAIMDETAIL")
                    }} state={"Pending"} title={'Customer misbehave with me'} subtitle={"Customer treatement was very unfair with me"} />
                    <ClaimSingleCard onPress={() => {
                        navigation.navigate("CLAIMDETAIL")
                    }} state={"Resolved"} title={'Customer misbehave with me'} subtitle={"Customer treatement was very unfair with me"} />
                </View>
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
export default Claim;