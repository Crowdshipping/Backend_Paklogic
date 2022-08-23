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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getClaim } from '../../services';

const Claim = ({ navigation }: any) => {
    const [claimResponse, setClaimResponse] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [assignShow, setAssignShow] = React.useState(false);
    const [isDisabled, setDisabled] = React.useState(false);
    const [pending, setPending] = React.useState(false);
    const [resolved, setResolved] = React.useState(true);
    const getData = async () => {
        setIsLoading(true);
        try {
            const value = await AsyncStorage.getItem('@user_Id');

            if (value !== null) {
                console.log("userID", value);
                // getAllVehiclesCompany("625510f2d8e3e400045de1bf")
                getClaim(value)
                    .then(response => response.json())
                    .then(result => {
                        setIsLoading(false);
                        if (result.success) {
                            setClaimResponse(result.claims);
                        }
                        // setFlightResponse(result.flights);
                        console.log(claimResponse)
                        console.log('Fvehicle', result);
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log('error', error);
                    });
            }
        } catch (e) { }
    };

    React.useEffect(() => {
        getData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getData();
        });
        return willFocusSubscription;
    }, []);

    const renderClaim = (item:any) => {
        return (
            <ClaimSingleCard 
            onPress={() => {
                navigation.navigate("CLAIMDETAIL",{item})
            }} 
            state={item.claimStatus}
            title={item.claimTitle}
            subtitle={item.claimDescription} />
        )
    }

    const noClaimAvailable = () => {
        return (
          <View style={{ height: '75%', justifyContent: 'center',flex:1,marginTop:hp('15%') }}>
            <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'red' }}>No claims available</Text>
            </View>
          </View>
        )
      }

    const renderClaimCheck = () => {
        let noClaimResolved=0;
        return <View >
            {claimResponse &&
                claimResponse.map((item: any) => {
                    console.log("itemitemitem12233", item);
                    if (pending === true && item.claimStatus==='Pending') {
                        console.log(item.claimStatus)
                        return renderClaim(item)
                    }
                    else if (resolved === true && item.claimStatus==='Resolved') {
                        return renderClaim(item)
                    }else{
                        noClaimResolved=noClaimResolved+1;
                    }
                    if(noClaimResolved===claimResponse.length){
                        return noClaimAvailable()

                    }
                })}
        </View>
    }




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
                        <CheckBoxState 
                            text={'Resolved'} 
                            onPress={() => {setResolved(!resolved)}}
                            checked={true} 
                        />
                        <CheckBoxState text={'Pending'} onPress={() => { setPending(!pending)}} />
                    </View>
                    {renderClaimCheck()}  
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