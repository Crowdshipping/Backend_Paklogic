import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {mapp} from '../theme/assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import {location} from '../theme/assets/svg';

interface card {
  firstname?: string;
  lastname?: string;
  mmsiNumber?: string;
  pickupCity?: string;
  handleNavigation: Function;
  dropoffCity?: string;
  shipDate?: string;
  requestText?: string;
}

export const BookingListCard = (props: card) => {
  const {
    firstname,
    lastname,
    mmsiNumber,
    pickupCity,
    handleNavigation,
    dropoffCity,
    shipDate,
    requestText,
  } = props;
  return (
    <View style={styles.detailsboxinner}>
      <View style={styles.flexrow}>
        <Image source={mapp} style={styles.img} />
        <View style={styles.test}>
          {(firstname || lastname) && (
            <Text style={styles.txtdetail}>
              {firstname} {lastname}
            </Text>
          )}

          <Text style={{fontSize: 15}}>MMSI: {mmsiNumber}</Text>
        </View>
      </View>
      <View style={styles.viewlocation}>
        <View
          style={{
            width: '10%',
            alignItems: 'center',
          }}>
          <SvgXml style={{}} xml={location} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            width: '90%',
            paddingHorizontal: wp(1),
          }}>
          <View style={styles.viewdetail}>
            <Text style={styles.txtdetail}>{pickupCity}</Text>
            <TouchableOpacity onPress={() => handleNavigation()}>
              <Text style={{color: 'green'}}>{requestText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewdetail}>
            <Text style={styles.txtdetail}>{dropoffCity}</Text>
            <Text style={{fontSize: 14}}>
              {moment(shipDate).format('YYYY-MM-DD hh:mm:ss')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
    paddingTop: hp(3),
  },
  txt1: {
    color: 'black',
    fontSize: hp(2),
  },
  box: {
    backgroundColor: 'lightgrey',
    borderRadius: hp(3),
    paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    textDecorationLine: 'underline',
  },
  Touch: {
    backgroundColor: '#F0F0F0',
    borderRadius: hp(1),
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
    // flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: wp(43),
    height: hp(7),
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: 'red',
  },
  detailsbox: {
    flex: 1,
    // elevation: 8,
    // marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    // paddingBottom: hp(5),
    // shadowColor: 'grey',
    // borderRadius: hp(2),
    // backgroundColor: 'white',
    // borderWidth: 2,
    // borderColor: colors.red,
    // marginBottom: hp(15),
    // height: hp(60),
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 8,
    // marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    // paddingVertical: hp(1),
    shadowColor: Platform.OS === 'android' ? '#000' : 'grey',
    borderRadius: hp(2),
    backgroundColor: 'white',
    marginVertical: hp(1),
    // borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  flexrow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    // paddingTop: hp(2),
    // borderWidth: 1,
    width: '100%',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingVertical: hp(1),
  },

  formInput_container: {
    height: hp(2.5),
    textAlignVertical: 'center',

    paddingVertical: 1,

    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: wp(12),
    width: wp(12),
    // borderWidth: 2,
    borderColor: 'green',
    borderRadius: 50,
    marginRight: hp(2),
  },
  viewdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtdetail: {
    fontSize: 18,
    color: 'black',
  },
  test: {
    // resizeMode: 'contain',
    // height: hp(6),
    // width: wp(12),
    // borderWidth: 2,
    // borderColor: 'orange',
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    // marginBottom: 20,
    // flex: 1,
  },
  errorMsg: {
    textAlign: 'left',
    color: 'red',
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
});
