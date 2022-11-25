import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ClaimSingleCard from './ClaimSingleCard';
import {getClaims, LogoutApi} from '../../../API';
import {CheckBoxState, Header} from '../../../components';
import {colors} from '../../../theme';
import {CommonActions, useIsFocused} from '@react-navigation/native';

const Claims = ({navigation}: any) => {
  const [claimResponse, setClaimResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [assignShow, setAssignShow] = useState(false);
  // const [isDisabled, setDisabled] = useState(false);
  const [pending, setPending] = useState(true);
  const [resolved, setResolved] = useState(true);
  const isfocus = useIsFocused();
  function getData() {
    setIsLoading(true);
    getClaims()
      .then((result: any) => {
        setIsLoading(false);
        if (result.success) {
          setClaimResponse(result.claims);
        }
      })
      .catch(async error => {
        setIsLoading(false);
        if (error.response.status === 401) {
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
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
          navigation.navigate('ClaimDetail', {item});
        }}
        state={item.claimStatus}
        title={item.claimTitle}
        subtitle={item.claimDescription}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={'Claims'}
        pressMethod={() => {
          navigation.goBack();
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            // backgroundColor: colors.boxBackground,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingVertical: hp(10),
            // paddingHorizontal: wp(10),
            // borderRadius: hp(2),
          }}>
          <ActivityIndicator size={'small'} color={colors.red} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.maincontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddClaim');
              }}
              style={styles.addbtn}>
              <Text style={styles.txt}>ADD NEW</Text>
            </TouchableOpacity>
            <View style={styles.radio}>
              <CheckBoxState
                text={'Resolved'}
                onPress={() => {
                  setResolved(!resolved);
                }}
                checked={resolved}
              />
              <CheckBoxState
                text={'Pending'}
                onPress={() => {
                  setPending(!pending);
                }}
                checked={pending}
              />
            </View>

            {claimResponse && claimResponse.length > 0 ? (
              claimResponse.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    {pending && item.claimStatus === 'Pending'
                      ? renderClaim(item)
                      : resolved &&
                        item.claimStatus === 'Resolved' &&
                        renderClaim(item)}
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  backgroundColor: colors.boxBackground,
                  // backgroundColor: 'aqua',
                  alignSelf: 'center',
                  // paddingVertical: hp(10),
                  marginVertical: '40%',

                  paddingHorizontal: wp(10),
                  borderRadius: hp(2),
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.red,
                    fontSize: hp(2),
                    paddingVertical: hp(10),
                  }}>
                  Sorry no claims available
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
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
