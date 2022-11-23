import React from 'react';
import {SafeAreaView, Modal, StyleSheet, View} from 'react-native';
// import Modal from 'react-native-modal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {GOOGLE_MAPS_APIKEY} from '../appConstants';
import {Button, Header} from '../components';
import {colors} from '../theme';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible?: boolean;
}

export const SearchPlaces = (props: IModal) => {
  const {isModalVisible, setModalVisible, setLocation} = props;
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView style={styles.container}>
        <View style={{marginBottom: widthPercentageToDP(5)}}>
          <Header title={''} pressMethod={() => setModalVisible(false)} />
        </View>
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
          // onFail={error => console.error(error)}
          styles={{
            container: {
              marginHorizontal: widthPercentageToDP(3),
            },
            textInput: {
              fontSize: 18,
              color: colors.black,
            },
            description: {
              color: colors.black,
            },
          }}
        />

        {__DEV__ && (
          <View>
            <Button
              title="Rawalpindi"
              onPress={() => {
                setLocation({
                  name: 'Rawalpindi',
                  lat: 33.5651107,
                  lon: 73.0169135,
                }),
                  setModalVisible(false);
              }}
            />

            <Button
              title="Islamabad"
              onPress={() => {
                setLocation({
                  name: 'Islamabad Capital Territory',
                  lat: 33.6844202,
                  lon: 73.047885,
                }),
                  setModalVisible(false);
              }}
            />
          </View>
        )}
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
