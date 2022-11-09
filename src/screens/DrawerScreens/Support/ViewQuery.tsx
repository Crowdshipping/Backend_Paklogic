import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CheckBoxState, Header} from '../../../components';
// import MyLoader from '../../components/MyLoader';

import {getQuestions, LogoutApi} from '../../../API';
import QuerySingleCard from './QuerySingleCard';
import {colors} from '../../../theme';
import {CommonActions, useIsFocused} from '@react-navigation/native';

const ViewQuery = ({navigation}: any) => {
  const [QueryResponse, setQueryResponse] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pending, setPending] = React.useState(true);
  const [resolved, setResolved] = React.useState(false);
  const isfocus = useIsFocused();

  const getData = async () => {
    setIsLoading(true);
    getQuestions()
      .then((result: any) => {
        setIsLoading(false);
        result.success && setQueryResponse(result.customerSupportQuestions);
      })
      .catch(async error => {
        setIsLoading(false);
        if (error.response.status === 401) {
          Alert.alert('Session Expired', 'Please login again');
          LogoutApi();
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
      });
  };

  useEffect(() => {
    if (isfocus) {
      getData();
    }
  }, [isfocus]);

  const renderQuery = (item: any, index: number) => {
    return (
      <View key={index}>
        <QuerySingleCard
          onPress={() => {
            if (item.isChatInitiated === false) {
              navigation.navigate('QueryDetail', {item});
            } else {
              navigation.navigate('ChatScreen', {supportId: item._id});
            }
          }}
          state={item.customerSupportStatus}
          title={item.customerSupportTitle}
          subtitle={item.customerSupportDescription}
        />
      </View>
    );
  };

  const noQueryAvailable = () => {
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
          Sorry no queries available
        </Text>
      </View>
    );
  };

  const renderQueryCheck = () => {
    return QueryResponse.length !== 0
      ? QueryResponse.map((item: any, index: number) => {
          if (pending === true && item.customerSupportStatus === 'Pending') {
            return renderQuery(item, index);
          } else if (
            resolved === true &&
            item.customerSupportStatus === 'Resolved'
          ) {
            return renderQuery(item, index);
          }
        })
      : noQueryAvailable();
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, height: '100%'}}>
      <Header title={'Support'} pressMethod={() => navigation.goBack()} />
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <ScrollView>
          <View style={styles.maincontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddQuery');
              }}
              style={styles.addbtn}>
              <Text style={styles.txt}>ADD QUERY</Text>
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
            {renderQueryCheck()}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 15,
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
export default ViewQuery;
