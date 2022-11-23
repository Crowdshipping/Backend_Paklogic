import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {IButton} from './interface';
import {styles} from './style';
import {colors} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Badge} from 'react-native-elements';

export const Button = (props: IButton) => {
  const {containerStyle, title, onPress, bg, loading, chat} = props;
  const isLoading = loading == undefined ? false : loading;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPress()}
        style={[
          styles.btnView,
          {backgroundColor: bg ? 'transparent' : colors.red},
        ]}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[styles.btnText, {color: bg ? colors.red : colors.white}]}>
              {title}
            </Text>
            {chat && (
              <>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={wp(5)}
                  color={colors.white}
                />
                <Badge
                  status="success"
                  containerStyle={{position: 'absolute', top: -2, right: -2}}
                />
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
