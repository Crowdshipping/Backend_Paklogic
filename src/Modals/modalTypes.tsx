import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
7;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from '../components';
import {colors} from '../theme';
export const ModalTypes = (props: any) => {
  const {isModalVisible, setModalVisible, Type, setSelectedType, other} = props;
  const [InputField, setInputField] = useState(false);
  return (
    <Modal
      isVisible={isModalVisible}
      // onBackButtonPress={setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}>
      <View
        style={{
          width: wp(90),
          //   height: hp(70),
          backgroundColor: colors.white,
          borderRadius: wp(2),
          padding: wp(5),
        }}>
        <ScrollView>
          {Type.map((t: any, i: any) => {
            return (
              <View key={t.id} style={{backgroundColor: colors.white}}>
                <TouchableOpacity
                  style={{marginVertical: hp(1), flexDirection: 'row'}}
                  onPress={() => {
                    {
                      t.name === 'other'
                        ? setInputField(true)
                        : (setSelectedType(t.name, t.id),
                          setModalVisible(false));
                    }
                  }}>
                  <Text style={{color: colors.black}}>{t.name}</Text>
                </TouchableOpacity>
                <View style={{height: hp(0.1), backgroundColor: 'lightgrey'}} />
              </View>
            );
          })}
          {other && (
            <TouchableOpacity
              style={{marginVertical: hp(1), flexDirection: 'row'}}
              onPress={() => {
                setInputField(true);
              }}>
              <Text style={{color: colors.black}}>other</Text>
            </TouchableOpacity>
          )}

          {InputField ? (
            <>
              <TextInput
                style={[
                  {
                    color: colors.black,
                    paddingBottom: hp('1%'),
                    paddingLeft: wp('2%'),
                    borderWidth: 1,
                    paddingVertical: 10,
                  },
                ]}
                autoFocus
                placeholder="Enter Product Type..."
                placeholderTextColor={'gray'}
                autoCorrect={false}
                autoComplete={'off'}
                numberOfLines={1}
                onChangeText={text => {
                  setSelectedType(text, '');
                }}
              />
              <Button
                title={'Done'}
                onPress={() => {
                  setModalVisible(false), setInputField(false);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
