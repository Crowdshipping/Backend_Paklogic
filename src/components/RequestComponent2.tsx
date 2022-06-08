import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import HorizontalDivider from './HorizontalDivider';
import { SvgXml } from 'react-native-svg';
import { LocationSvg } from '../theme/assets/svg/LocationSvg';
const RequestComponent2 = ({
  onPress,
  fromCountry,
  toCountry,
  date,
  airline,
  destinationTime
}: any) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Image
              style={{ width: 55, height: 55, borderRadius: 50 }}
              source={require('../assets/aeroplane.png')}
            />
          </View>
          <View style={styles.topRight}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={styles.subTitleText}>Flight Number: {airline}</Text>
            </View>
          </View>
        </View>
        <HorizontalDivider />
        <View style={styles.bottom}>
          <View style={styles.bottomLeft}>
            <SvgXml xml={LocationSvg} width={50} height={80} />
          </View>
          <View style={styles.bottomMid}>
            <Text style={styles.countryText}>{fromCountry}</Text>
            <Text style={styles.countryText}>{toCountry}</Text>
          </View>
          <View style={styles.bottomRight}>
            <Text style={styles.dateText}>{destinationTime}</Text>
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
    flex: 2,
  },
  bottomRight: {
    justifyContent: 'flex-end',
    flex: 2,
  },
  acceptText: {
    color: '#1B8B18',
    fontSize: 15,
  },
  rejectText: {
    color: '#DC3E3E',
    fontSize: 15,
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
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default RequestComponent2;
