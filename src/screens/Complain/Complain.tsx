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
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ComplainSingleCard from './ComplainSingleCard';
const Complain = ({ navigation }: any) => {
    // const [bdetail, setbdetail] = useState({
    //     name: 'Mr.Joy',
    //     phone: '090078601',
    //     date: '12/04/20',
    //     ticket: 'A56t70',
    //     pickup: 'Tellin, Estonia',
    //     dropoff: 'Helsinki, Estonia',
    //     date1: 'March 13,2022',
    //     request: 'In-Progress',
    // });
    // const [checked, setChecked] = useState('first');
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ADDCOMPLAIN");
                    }} style={styles.addbtn}>
                        <Text style={styles.txt}>ADD NEW</Text>
                    </TouchableOpacity>

                    <ComplainSingleCard onPress={() => {
                        navigation.navigate("COMPLAINDETAIL")
                    }} title={'Complain title'} date={"29-12-2022"} status={'Pending'} />
                    <ComplainSingleCard onPress={() => {

                    }} title={'Complain title'} date={"29-12-2022"} status={'Resolved'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    addbtn: {
        borderRadius: hp(2),
        paddingHorizontal: hp(0.5),
        paddingVertical: hp(1),
        alignItems: 'center',
        width: wp(25),
        borderWidth: 1,
        alignSelf: 'flex-end',
    },
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
    },
    txt: {
        color: 'black',
        fontSize: 16,
    },

});
export default Complain;