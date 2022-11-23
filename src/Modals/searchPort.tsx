import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
// import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header} from '../components';
import {colors} from '../theme';
import {LogoutApi, searchPort} from '../API';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible: boolean;
}
interface portArray {
  Country: string;
  Location: string;
  // Coordinates: string;
  Name: string;
}
interface portArray1 extends Array<portArray> {}

export const SearchPort = (props: IModal) => {
  const navigation = useNavigation();

  const [ports, setports] = useState<portArray1>([]);
  function handleSearch(text: string) {
    searchPort(text)
      .then((rest: any) => {
        setports(rest.ports);
      })
      .catch(error => {
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
        // Alert.alert(error.message ? error.message : 'Something went wrong');
      });
  }
  const {isModalVisible, setModalVisible, setLocation} = props;
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView>
        <View style={{marginBottom: wp(5)}}>
          <Header
            title={'Search Port'}
            pressMethod={() => setModalVisible(false)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: wp(5),
          }}>
          <View style={{width: '75%'}}>
            <TextInput
              autoFocus
              placeholder={'Enter port name'}
              placeholderTextColor={colors.gray}
              onChangeText={(text: string) => {
                handleSearch(text);
              }}
              style={{
                paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                borderBottomWidth: 1,
                borderColor: colors.gray,
                fontSize: 18,
                color: colors.black,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // setLocation({
              //   Country: '',
              //   Location: '',
              //   Name: '',
              // });
              setModalVisible(false);
            }}
            style={{width: '20%'}}>
            <Text style={{color: colors.red, fontSize: 18}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{padding: wp(5)}}>
          {ports?.map((item: portArray, index: number) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 5,
                  marginVertical: hp(1),
                }}
                key={index}
                onPress={() => {
                  setModalVisible(false);
                  setLocation(item);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    padding: wp(3),
                    color: colors.black,
                  }}>
                  {item.Name} {item.Country && item.Country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
// ({item.Country})
