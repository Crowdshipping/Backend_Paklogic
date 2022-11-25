import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Button, Header} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SuccessModal} from '../../../Modals';
import {postQuestion} from '../../../API';
import {colors} from '../../../theme';
const AddQuery = ({navigation}: any) => {
  const [QueryTitle, setQueryTitle] = useState<any>();
  const [isQueryTitle, setIsQueryTitle] = useState(true);
  const [isQueryDetail, setIsQueryDetail] = useState(true);
  const [QueryDetail, setQueryDetail] = useState<any>();
  const [isQueryDetailLength, setIsQueryDetailLength] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateQueryTitle = () => {
    if (QueryTitle) {
      setIsQueryTitle(true);
      return true;
    } else {
      setIsQueryTitle(false);
      return false;
    }
  };
  const validateQueryDetail = () => {
    if (QueryDetail) {
      if (QueryDetail.length >= 10) {
        setIsQueryDetail(true);
        setIsQueryDetailLength(true);
        return true;
      } else {
        setIsQueryDetail(true);
        setIsQueryDetailLength(false);
        return false;
      }
    } else {
      setIsQueryDetail(false);
      return false;
    }
  };

  const uploadDataToServer = async () => {
    const QueryT = validateQueryTitle();
    const QueryD = validateQueryDetail();
    if (QueryT && QueryD) {
      let data = {
        QueryTitle,
        QueryDetail,
      };
      setIsLoading(true);
      postQuestion(data).then((result: any) => {
        if (result.success) {
          setIsModalVisible(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Header title={'Add Query'} pressMethod={() => navigation.goBack()} />
        <View style={styles.maincontainer}>
          <Text style={styles.heading}>Query Title</Text>
          <View style={styles.title}>
            <TextInput
              placeholder={'Write Query Title Here '}
              placeholderTextColor={colors.gray}
              onChangeText={(value: any) => {
                setQueryTitle(value), setIsQueryTitle(true);
              }}
              style={{flex: 1, color: colors.black}}
            />
          </View>
          {!isQueryTitle && (
            <Text style={{color: colors.red, marginLeft: '2%'}}>
              Query Title is required
            </Text>
          )}
          <Text style={styles.heading}>Query Description</Text>
          <View style={styles.description}>
            <TextInput
              placeholder={'Write Description Here '}
              placeholderTextColor={colors.gray}
              onChangeText={(value: any) => {
                setQueryDetail(value),
                  setIsQueryDetail(true),
                  setIsQueryDetailLength(true);
              }}
              multiline
              style={{flex: 1, textAlignVertical: 'top', color: colors.black}}
            />
          </View>
          {!isQueryDetail && (
            <Text style={{color: colors.red, marginLeft: '2%'}}>
              Query Details is required
            </Text>
          )}
          {!isQueryDetailLength && (
            <Text style={{color: colors.red, marginLeft: '2%'}}>
              Query Details have at least 10 words{' '}
            </Text>
          )}

          <Button
            title="Submit"
            onPress={uploadDataToServer}
            loading={isLoading}
          />
        </View>
      </ScrollView>

      <SuccessModal
        isSuccess={isModalVisible}
        setsuccess={() => {
          setIsModalVisible(false), navigation.goBack();
        }}
        text={'Query Added'}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    paddingVertical: wp(5),
    paddingHorizontal: hp(3),
    height: hp(100),
  },
  txt: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    height: hp(8),
    backgroundColor: '#E5E5E5',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  description: {
    height: hp(30),
    backgroundColor: '#E5E5E5',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  upload: {
    height: hp(15),
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginVertical: hp(2),
  },
  imageBox: {
    backgroundColor: '#F1F1F1',
    height: 170,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default AddQuery;
