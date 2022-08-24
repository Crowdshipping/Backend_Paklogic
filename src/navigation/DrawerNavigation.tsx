import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {

  homeicon,
  historyicon,

  logouticon,

} from '../theme/assets/svg';
import { colors } from '../theme';
import { profile } from '../theme/assets/images';

const CustomDrawerContent = (props: any) => {
  const [userId, setUserId] = React.useState<any>('');
  // const [isLoading, setIsLoading] = React.useState(false);
  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_Id');
      setUserId(value);
    } catch (e) {
      console.log(e);
    }
  };
  const removeId = async () => {
    await AsyncStorage.removeItem('@user_Id');
    await AsyncStorage.removeItem('@userEmail');
    await AsyncStorage.removeItem('@userName');
  };
  const logout = () => {
    Alert.alert(
      '',
      'Are you Sure you want to Logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // setIsLoading(true);

            removeId();
            props.navigation.navigate('Signin');

          },
          style: 'default',
        },
        { text: 'No' },
      ],
      { cancelable: false },
    );
  };
  React.useEffect(() => {
    getUserId();
  }, []);
  return (
    <SafeAreaView>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}
      <View>
        <View style={styles.ViewTop}>
          <Image source={profile} style={styles.img} />
          <View style={{ paddingTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              tony stark
            </Text>
            <Text style={{ fontSize: 18, color: 'white' }}>
              tonystark@gmail.com
            </Text>
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('ViewProfile');
              }}>
              <Text style={{ fontSize: 18, color: 'yellow' }}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ViewDetails}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MyDrawer', { screen: 'Landing' });
            }}
            style={styles.viewunderline}>
            <SvgXml xml={homeicon} width={25} />
            <Text style={styles.txtdetail}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('BookingHistory');
            }}
            style={styles.viewunderline}>
            <SvgXml style={styles.svg} xml={historyicon} width={25} />
            <Text style={styles.txtdetail}>Booking History</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ALLSHIPS');
              }}
              style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={ship2Svg} width={25} />
              <Text style={styles.txtdetail}>Manage Ships</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={yourpkgSvg} width={25} />
              <Text style={styles.txtdetail}>Your Package</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={clockSvg} width={25} />
              <Text style={styles.txtdetail}>Booking History</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('CLAIM');
              }}
              style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={claimicon} width={25} />
              <Text style={styles.txtdetail}>Claim</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('COMPLAIN');
              }}
              style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={claimicon} width={25} />
              <Text style={styles.txtdetail}>Complain</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={supportSvg} width={25} />
              <Text style={styles.txtdetail}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={setting} width={25} />
              <Text style={styles.txtdetail}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={notificationSvg} width={25} />
              <Text style={styles.txtdetail}>Notification</Text>
            </TouchableOpacity>
             */}
          {/* <View style={{borderBottomWidth: 1}}></View> */}
          <TouchableOpacity onPress={logout} style={styles.viewunderline}>
            <SvgXml style={styles.svg} xml={logouticon} width={25} />
            <Text style={styles.txtdetail}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingTop: hp(3),
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: colors.red,
  },
  ViewTop: {
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  svg: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  ViewDetails: {
    paddingTop: hp(5),
    paddingHorizontal: hp(5),
  },
  viewunderline: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  txtdetail: {
    fontSize: 18,
    paddingLeft: wp(5),
    color: 'black',
    textAlign: 'center',
  },
});
//     )
// };

export default CustomDrawerContent;
