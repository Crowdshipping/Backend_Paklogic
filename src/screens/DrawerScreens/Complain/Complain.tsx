import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ComplainSingleCard from './ComplainSingleCard';
import {getComplains, LogoutApi} from '../../../API';
import {colors} from '../../../theme';
import {Header} from '../../../components';
import {CommonActions} from '@react-navigation/native';
const Complain = ({navigation}: any) => {
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
          setIsLoading(false);
        }
      })
      .catch(async error => {
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
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });
    return willFocusSubscription;
  }, []);

  const renderComplain = (item: any, index: number) => {
    return (
      <View key={index}>
        <ComplainSingleCard
          onPress={() => {
            navigation.navigate('ComplainDetail', {item});
          }}
          title={item.complainTitle}
          date={item.date}
          status={item.complainStatus}
        />
      </View>
    );
  };

  const noComplainAvailable = () => {
    return (
      <View
        style={{
          backgroundColor: colors.boxBackground,
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
            fontSize: hp(2),
          }}>
          Sorry no complains available
        </Text>
      </View>
    );
  };

  const renderComplainCheck = () => {
    return complainResponse.length !== 0
      ? complainResponse.map((item: any, index: number) => {
          return renderComplain(item, index);
        })
      : noComplainAvailable();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <ScrollView>
          <Header title={'Complains'} pressMethod={() => navigation.goBack()} />
          <View style={styles.maincontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddComplain');
              }}
              style={styles.addbtn}>
              <Text style={styles.txt}>ADD NEW</Text>
            </TouchableOpacity>
            {renderComplainCheck()}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  addbtn: {
    borderRadius: hp(2),
    paddingHorizontal: hp(0.5),
    paddingVertical: hp(1),
    margin: wp(5),
    alignItems: 'center',
    width: wp(25),
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  maincontainer: {
    paddingVertical: wp(5),
    // paddingHorizontal: hp(3),
  },
  txt: {
    color: 'black',
    fontSize: 16,
  },
});
export default Complain;
