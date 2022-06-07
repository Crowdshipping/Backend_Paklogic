import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import HorizontalDivider from './HorizontalDivider';
import { SvgXml } from 'react-native-svg';
import { LocationSvg } from '../theme/assets/svg/LocationSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { backendUrl } from '../appConstants';
const RequestComponent = ({
  onPress,
  firstName,
  lastName,
  departureAirport,
  destinationAirport,
  acceptPress,
  rejectPress,
  date,
  myImage,
  isAccepted,
  isPostRequest,
  flightNumber,
}: any) => {

  console.log("my image", myImage);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        {console.log('requestcomimag', myImage)}




        <View style={styles.top}>
          <View style={styles.topLeft}>
            {/* <Image
              style={{width: 55, height: 55, borderRadius: 50}}
              source={{uri: myImage}}
            /> */}
            {myImage ? (
              <Image
                style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                source={{ uri: backendUrl + myImage }}
              />
            ) : (
              <Image
                style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                source={require('../assets/aeroplane.png')}
              />
            )}
          </View>
          <View style={styles.topRight}>
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.titleText}>
                {firstName + '\t' + lastName}
              </Text>
              <Text style={styles.subTitleText}>FlightNumber: {flightNumber}</Text>
            </View>
          </View>
        </View>
        <HorizontalDivider />
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <SvgXml xml={LocationSvg} width={50} height={80} />
          </View>
          <View style={styles.bottomMid}>
            <Text style={styles.countryText}>{departureAirport}</Text>
            <Text style={styles.countryText}>{destinationAirport}</Text>
          </View>
          <View style={styles.bottomRight}>
            <TouchableOpacity onPress={acceptPress}>
              <Text style={styles.acceptText} >
                {isAccepted ? 'Accepted' : 'Accept'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity >

              <Text onPress={rejectPress} style={styles.rejectText} >
                {isAccepted || isPostRequest ? '' : 'Reject'}
              </Text>

            </TouchableOpacity>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    marginTop: 25,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  topLeft: { flex: 1 },
  topRight: { flex: 3.35 },
  bottom: {
    marginTop: 15,
    flexDirection: 'row',
  },
  bottomLeft: { flex: 1.0 },
  bottomMid: {
    justifyContent: 'space-between',
    flex: 1.9,
  },
  bottomRight: {
    justifyContent: 'space-between',
    flex: 1.4,
  },
  acceptText: {
    color: '#1B8B18',
    fontSize: 15,
  },
  rejectText: {
    color: '#DC3E3E',
    fontSize: 15,
    fontWeight: 'bold'
  },
  dateText: {
    color: '#A19B9B',
    fontSize: 15,
  },
  countryText: {
    fontSize: 12,
  },
  titleText: {
    fontSize: 21,
  },
  subTitleText: {
    fontSize: 17,
  },
});
export default RequestComponent;
