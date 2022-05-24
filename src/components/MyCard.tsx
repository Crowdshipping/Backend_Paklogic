import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyCard = ({status, myColor}: any) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 25,
        width: '100%',
        height: 230,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <View style={{flex: 1.3, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 12,
          }}>
          <Image
            style={{width: 100, height: 100, borderRadius: 50}}
            source={require('../assets/tony.jpg')}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-between',
            marginHorizontal: 25,
            marginVertical: 25,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Aman
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="clock"
                color={'red'}
                size={25}
                style={{alignSelf: 'center'}}
              />
              <Text style={{color: 'red'}}>8:00PM</Text>
            </View>
          </View>
          <Text>892 Chestnut Ave.Long Branch</Text>
          <Text>24/04/2019 | 8:00PM</Text>
          <Text>$ 150.00</Text>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 15,
              color: myColor,
              fontWeight: 'bold',
            }}>
            {status}
          </Text>
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: 'red',
            padding: 17,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
          onPress={() => {}}>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
            VIEW FULL DETAILS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCard;
