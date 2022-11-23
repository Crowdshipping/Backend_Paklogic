import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {cross} from '../theme/assets/svg';
import {colors} from '../theme/colors';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IUpdatePrice {
  isSuccess: boolean;
  setsuccess: Function;
  pressMethod: Function;
}

export const UpdatePrice = (props: IUpdatePrice) => {
  const {isSuccess, setsuccess, pressMethod} = props;
  const [errormsg, seterrorMsg] = useState('');
  let updatedPrice: number;

  // useFocusEffect(
  //   useCallback(() => {
  //     const timeoutID = isSuccess
  //       ? setTimeout(() => {
  //           setsuccess();
  //           if (pressMethod) pressMethod();
  //         }, 5000)
  //       : undefined;

  //     // timeoutID

  //     return () => clearTimeout(timeoutID);
  //   }, [isSuccess]),
  // );

  function handlePrice(text: number) {
    updatedPrice = text;
  }

  return (
    <Modal isVisible={isSuccess} onBackdropPress={() => setsuccess()}>
      <View style={styles.modal}>
        <View
          style={{
            alignSelf: 'flex-end',
            borderRadius: 78,
            //   marginTop: 8,
            //   marginRight: 15,
            //   borderWidth: 1,
            backgroundColor: colors.red,
            padding: 5,
            left: 10,
            bottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setsuccess(false);
            }}>
            <SvgXml
              // style={styles.cross_img}
              width="20"
              height="20"
              xml={cross}
            />
          </TouchableOpacity>
        </View>
        <FontAwesome
          name="dollar"
          size={30}
          color={colors.black}
          style={{alignSelf: 'center', paddingBottom: hp(2)}}
        />
        <View
          style={{
            borderWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: wp(2),
            // paddingVertical: 30,
            // marginBottom: hp(2),
            marginHorizontal: wp(10),
          }}>
          <TextInput
            placeholder="Enter updated price"
            placeholderTextColor={colors.gray}
            style={{
              flex: 1,
              borderRadius: wp(2),
              paddingHorizontal: wp(5),
              color: colors.black,
              paddingVertical: hp(1),
            }}
            keyboardType={'numeric'}
            onChangeText={text => {
              seterrorMsg('');
              handlePrice(parseInt(text));
            }}
          />
        </View>
        {errormsg ? <Text style={styles.errorMsg}>{errormsg}</Text> : null}

        <TouchableOpacity
          onPress={() => {
            isNaN(updatedPrice)
              ? seterrorMsg('only numbers are allowed')
              : updatedPrice < 20
              ? seterrorMsg('price must be greater than 20')
              : pressMethod(updatedPrice);
          }}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: colors.red,
            width: wp(20),
            borderRadius: 10,
            marginVertical: hp(2),
          }}>
          <Text
            style={{
              fontSize: 16,
              marginVertical: hp(1.5),
              textAlign: 'center',
              color: colors.white,
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
