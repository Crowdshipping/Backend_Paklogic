import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import { location } from '../theme/assets/svg';

import { colors } from '../theme';

interface card {
  firstname?: string;
  lastname?: string;
  mmsiNumber?: string;
  pickupCity?: string;
  handleNavigation?: Function;
  handleTracking?: Function;
  handleCancellation?: Function;
  dropoffCity?: string;
  shipDate?: string;
  requestText?: string;
  buttonText?: string;
  img?: ImageSourcePropType;
  svg?: string;
  mmsi: string;
  price?: string;
  btn?: Boolean;
  btn1?: Boolean;
}

export const BookingListCard = (props: card) => {
  const {
    firstname,
    lastname,
    mmsiNumber,
    pickupCity,
    handleNavigation,
    handleTracking,
    handleCancellation,
    dropoffCity,
    shipDate,
    requestText,
    buttonText,
    img,
    svg,
    mmsi,
    price,
    btn,
    btn1,
  } = props;

  return (
    <View style={styles.detailsboxinner}>
      <View style={styles.flexrow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {img ? (
            <Image source={img} style={styles.img} />
          ) : (
            svg && (
              <SvgXml
                xml={svg}
                style={styles.img}
                height={wp(12)}
                width={wp(12)}
              />
            )
          )}

          <View style={styles.test}>
            {(firstname || lastname) && (
              <Text style={styles.txtdetail}>
                {firstname} {lastname}
              </Text>
            )}
            <Text style={{ fontSize: 15 }}>
              {mmsi}: {mmsiNumber}
            </Text>
          </View>
        </View>
        {price && (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'red',
            }}>
            {price}
          </Text>
        )}
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
          <View style={[styles.viewdetail, { alignItems: 'flex-start', }]}>
            <Text style={styles.txtdetail}>{pickupCity}</Text>



          </View>
          <View style={[styles.viewdetail, { alignItems: 'flex-end' }]}>
            <Text style={styles.txtdetail}>{dropoffCity}</Text>

          </View>
        </View>

      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: wp(1),
        }}>
        {/* <Text style={{ color: 'green' }}> {requestText}</Text> */}
        {handleNavigation ? <TouchableOpacity style={{
          borderRadius: wp(2),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.red,
        }} onPress={() => handleNavigation()}>
          <Text style={{
            marginVertical: wp(1.5),
            marginHorizontal: wp(2),
            color: colors.white,
          }}>{requestText}</Text>
        </TouchableOpacity>
          : requestText && <Text style={{ color: 'green' }}>{requestText}</Text>}

        <View style={{ flexDirection: 'row' }}>

          {handleCancellation && btn1 && <TouchableOpacity style={{
            borderRadius: wp(2),
            marginRight: wp(2),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.red,
          }} onPress={() => handleCancellation()}>
            <Text style={{
              marginVertical: wp(1.5),
              marginHorizontal: wp(2),
              color: colors.white,
            }}>Cancel</Text>
          </TouchableOpacity>}

          {shipDate ? (
            <Text style={{ fontSize: 14 }}>
              {moment(shipDate).format('YYYY-MM-DD hh:mm:ss')}
            </Text>
          ) : btn && handleTracking ? (
            <TouchableOpacity
              style={{
                borderRadius: wp(2),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.red,
              }}
              onPress={() => {
                handleTracking();
              }}>
              <Text
                style={{
                  marginVertical: wp(1.5),
                  marginHorizontal: wp(2),
                  color: colors.white,
                }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          ) : null}
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
    color: colors.black,
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
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 8,
    shadowColor: Platform.OS === 'android' ? colors.black : 'grey',
    borderRadius: hp(2),
    backgroundColor: colors.white,
    marginVertical: hp(1),
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),

    width: '100%',
    // borderWidth: 1,

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

    borderColor: 'green',
    borderRadius: 50,
  },
  viewdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtdetail: {
    fontSize: 18,
    color: colors.black,
    // maxWidth: '70%'
  },
  test: {
    justifyContent: 'flex-start',
    marginHorizontal: '5%',

    borderRadius: 10,
  },
  errorMsg: {
    textAlign: 'left',
    color: 'red',
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
});
