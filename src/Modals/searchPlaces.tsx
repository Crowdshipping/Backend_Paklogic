import React from 'react';
import { SafeAreaView, Modal, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
// import Modal from 'react-native-modal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { GOOGLE_MAPS_APIKEY } from '../appConstants';
import { Header } from '../components';
import { colors } from '../theme';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible?: boolean;
}
interface cityArray {
  name: string;
  code: string;
  coordinates: { lat: string; lon: string };
  country_code: string;
  time_zone: string;
}
interface cityArray1 extends Array<cityArray> { }

export const SearchPlaces = (props: IModal) => {

  const { isModalVisible, setModalVisible, setLocation } = props;
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: widthPercentageToDP(5) }}>
          <Header title={''} pressMethod={() => setModalVisible(false)} />
        </View>
        {/* <View style={{ marginHorizontal: widthPercentageToDP(5) }}> */}
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            let data1 = {
              name: details?.formatted_address,
              lat: details?.geometry.location.lat,
              lon: details?.geometry.location.lng,
            };
            setModalVisible(false);
            setLocation(data1);
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          onFail={error => console.error(error)}
          styles={{
            container: {
              marginHorizontal: widthPercentageToDP(3)
            },
            textInput: {
              fontSize: 18
            },

          }}
        />
        {/* </View> */}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
});
