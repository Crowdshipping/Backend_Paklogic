import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import {Textbox, Button, MapHeader} from '../../components/index';
import {receiver_derails} from '../../theme/assets/svg/index';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {mapp} from '../../theme/assets/images/index';

import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './style';

const ReceiverDetailsScreen = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <ImageBackground
          style={styles.bgImage}
          resizeMode={'cover'}
          source={mapp}>
          <TouchableOpacity onPress={() => {}} style={styles.menu}>
            <Entypo name="menu" size={25} />
          </TouchableOpacity>
          <View style={styles.location}>
            <Textbox
              title={'Pickup Location'}
              placeholder={'Pickup Location'}
              onChangeValue={() => {}}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={'Drop Location'}
              onChangeValue={() => {}}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.viewHeader}>
              <MapHeader
                title="receiver Details"
                picture={receiver_derails}
                pressMethod={() => {}}
              />
            </View>
            <View style={styles.main}>
              <View>
                <Textbox
                  title="Name"
                  placeholder="Name"
                  onChangeValue={() => {}}
                />
                <Textbox
                  title="Phone Number"
                  placeholder="Phone Number"
                  onChangeValue={() => {}}
                />
              </View>

              <Button
                title="Proceed to pay"
                onPress={() => navigation.navigate('VerifyOtp')}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default ReceiverDetailsScreen;
