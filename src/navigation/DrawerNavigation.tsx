import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
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
import { homeicon, historyicon, logouticon, claimicon, notificationicon, supporticon } from '../theme/assets/svg';
import { colors } from '../theme';
import { profile } from '../theme/assets/images';
import { prodUrl } from '../appConstants';
import { LogoutApi } from '../API';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppContext } from '../../App';



const CustomDrawerContent = (props: any) => {
  const [email, setemail] = React.useState<any>('');
  const [name, setname] = React.useState<any>('');
  const [pic, setpic] = React.useState<any>('');
  const { userData } = useContext(AppContext)

  const isfocus = useIsFocused();

  // const [isLoading, setIsLoading] = React.useState(false);
  // const getUserData = async () => {
  //   try {
  //     setemail(await AsyncStorage.getItem('@userEmail'));
  //     setname(await AsyncStorage.getItem('@userFName'));
  //     setpic(await AsyncStorage.getItem('@userId'));
  //     setpic(prodUrl + (await AsyncStorage.getItem('@useerPic')));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const removeId = async () => {
    // await AsyncStorage.removeItem('@user_Id');
    // await AsyncStorage.removeItem('@userEmail');
    // await AsyncStorage.removeItem('@userName');
    // await AsyncStorage.removeItem('@userPlayerId');
    await AsyncStorage.clear()
  };
  const logout = () => {
    Alert.alert(
      '',
      'Are you Sure you want to Logout?',
      [
        {
          text: 'Yes',
          onPress: () => {

            LogoutApi()
              .then((rest: any) => {
                rest.success && (removeId(),
                  props.navigation.replace('Signin'))
              })
              .catch(error =>
                Alert.alert(
                  error.message ? error.message : 'Something went wrong',
                ),
              );
          },
          style: 'default',
        },
        { text: 'No' },
      ],
      { cancelable: false },
    );
  };

  // getUserData();
  // React.useEffect(() => {
  //   if (isfocus) {
  //     // console.log('drawer drawer')
  //     // getUserData();
  //   }
  // }, [isfocus]);
  return (
    <SafeAreaView>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}

      <View style={styles.ViewTop}>
        {userData.profilepic ? (
          <Image source={{ uri: prodUrl + userData.profilepic }} style={styles.img} />
        ) : (
          <Image source={profile} style={styles.img} />
        )}

        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Text
            style={{ fontSize: 18, color: colors.white, fontWeight: 'bold' }}>
            {userData.firstname} {userData.lastname}
          </Text>
          <Text style={{ fontSize: 18, color: colors.white }}>{userData.email}</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ViewProfile');
            }}>
            <Text style={{ fontSize: 18, color: 'yellow' }}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ViewDetails}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Landing');
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

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Claims');
          }}
          style={styles.viewunderline}>
          <SvgXml style={styles.svg} xml={claimicon} width={25} />
          <Text style={styles.txtdetail}>Claim</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LoggedUserResetPassword');
          }}
          style={styles.viewunderline}>
          {/* <SvgXml style={styles.svg} xml={pass} width={25} /> */}
          <Icon
            name="shield"
            color={colors.black}
            size={25}
            style={{ alignSelf: 'center', }}
          />
          <Text style={styles.txtdetail}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Complain');
          }}
          style={styles.viewunderline}>
          <SvgXml style={styles.svg} xml={claimicon} width={25} />
          <Text style={styles.txtdetail}>Complain</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('ViewQuery');
        }} style={styles.viewunderline}>
          <SvgXml style={styles.svg} xml={supporticon} width={25} />
          <Text style={styles.txtdetail}>Support</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={setting} width={25} />
              <Text style={styles.txtdetail}>Setting</Text>
            </TouchableOpacity> */}
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('NotifictionHistory');
        }} style={styles.viewunderline}>
          <SvgXml style={styles.svg} xml={notificationicon} width={25} />
          <Text style={styles.txtdetail}>Notification</Text>
        </TouchableOpacity>

        {/* <View style={{borderBottomWidth: 1}}></View> */}
        <TouchableOpacity onPress={logout} style={styles.viewunderline}>
          <SvgXml style={styles.svg} xml={logouticon} width={25} />
          <Text style={styles.txtdetail}>Logout</Text>
        </TouchableOpacity>
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
    // borderWidth: 3,
    // borderColor: colors.black,
    backgroundColor: colors.white,
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
    color: colors.black,
    textAlign: 'center',
  },
});
//     )
// };

export default CustomDrawerContent;
