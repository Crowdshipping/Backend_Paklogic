import React, { useState } from 'react';
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
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ComplainSingleCard from './ComplainSingleCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getComplains } from '../../API/';
import { colors } from '../../theme';
import { Header } from '../../components';
const Complain = ({ navigation }: any) => {
    const [complainResponse, setComplainesponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [pending, setPending] = React.useState(false);
    // const [resolved, setResolved] = React.useState(true);

    const getData = async () => {
        setIsLoading(true);
        getComplains()
            .then((result: any) => {
                setIsLoading(false);
                if (result.success) {
                    setComplainesponse(result.complains);
                    setIsLoading(false)
                }
                // setFlightResponse(result.flights);
                console.log(complainResponse)
                console.log('Fvehicle', result);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error', error);
            });

    };

    React.useEffect(() => {
        getData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getData();
        });
        return willFocusSubscription;
    }, []);

    const renderComplain = (item: any) => {
        return (
            <ComplainSingleCard onPress={() => {
                navigation.navigate("ComplainDetail", { item })
            }} title={item.complainTitle} date={item.date} status={item.complainStatus} />

        )
    }

    const noComplainAvailable = () => {
        return (
            <View style={{ height: '75%', justifyContent: 'center', flex: 1, marginTop: hp('15%') }}>
                <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>No complain available</Text>
                </View>
            </View>
        )
    }

    const renderComplainCheck = () => {

        return <View >
            {complainResponse.length !== 0 ?
                complainResponse.map((item: any) => {
                    console.log("itemitemitem12233", item);
                    return renderComplain(item);
                }) :
                noComplainAvailable()
            }
        </View>
    }








    return (
        <SafeAreaView>
            {isLoading ?
                <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                />

                :
                <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                    <Header title={'Complains'} pressMethod={() => navigation.goBack()} />
                    <View style={styles.maincontainer}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("AddComplain");
                        }} style={styles.addbtn}>
                            <Text style={styles.txt}>ADD NEW</Text>
                        </TouchableOpacity>
                        {renderComplainCheck()}
                    </View>
                </ScrollView>
            }
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