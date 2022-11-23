import React, {useState, useEffect, useContext} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {prodUrl} from '../../appConstants';
import {
  createChat,
  getChat,
  getSupportChat,
  LogoutApi,
  readChat,
} from '../../API';
import {io, Socket} from 'socket.io-client';
import {AppContext} from '../../../App';

import Icon from 'react-native-vector-icons/Feather';
import {colors} from '../../theme';
import {Header} from '../../components';
import {Avatar} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatScreen = ({navigation, route}: any) => {
  const {receiverId, requestId, supportId} = route.params;
  const {userData, setNotificationData} = useContext(AppContext);
  const [messages, setMessages] = useState<any>([]);
  const [messagesSender, setMessagesSender] = useState<any>([]);
  const [connected, setConnected] = React.useState(false);
  const [socket, setSocket] = React.useState<Socket>();
  const [isloading, setIsloading] = useState(true);
  const [myData, setMyData] = useState<any>({});

  function onError(error: any) {
    if (error.response.status === 401) {
      LogoutApi();
      Alert.alert('Session Expired', 'Please login again');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Welcome'}],
        }),
      );
    } else {
      Alert.alert(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Something went wrong',
      );
    }
  }
  const getChatData = async () => {
    if (supportId) {
      getSupportChat(supportId)
        .then((result: any) => {
          setMyData(result.user);
          setMessages(result.chat.reverse());
        })
        .catch(error => {
          onError(error);
        })
        .finally(() => setIsloading(false));
    } else {
      // getChat(receiverId, requestId)
      //   .then((result: any) => {
      //     setMyData(result.userA);
      //     if (result.initiated === false) {
      //       createChat(receiverId, requestId)
      //         .then()
      //         .catch(error => {
      //           onError(error);
      //         })
      //         .finally(() => setIsloading(false));
      //     } else {
      //       setMessages(result.chat.reverse());
      //     }
      //   })
      //   .catch(error => {
      //     onError(error);
      //   })
      //   .finally(() => setIsloading(false));
      try {
        const result: any = await getChat(receiverId, requestId);
        setMyData(result.userA);
        if (result.initiated === false) await createChat(receiverId, requestId);
        else setMessages(result.chat.reverse());
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        onError(error);
      }
    }
  };

  const setWebSocket = async () => {
    const newSocket = io(
      `ws://crowdshipping-chat.herokuapp.com?userId=${userData._id}`,
      {
        secure: true,
        transports: ['websocket'],
      },
    );
    newSocket.on('connect', () => {
      setConnected(true);
    });
    setSocket(newSocket);
  };

  const onReadChat = async () => {
    readChat(requestId)
      .then((result: any) => {})
      .catch(error => {
        if (error.response.status === 401) {
          onError(error);
        }
      });
  };
  useEffect(() => {
    setNotificationData({});
    getChatData();
    setWebSocket();
    if (!supportId) {
      onReadChat();
    }
  }, []);

  useEffect(() => {
    if (connected) {
      if (supportId) {
        socket?.on(`newMessage/${supportId}`, r => {
          if (!r.user) {
            setMessages((PreviousMessages: any) => [
              r.message,
              ...PreviousMessages,
            ]);
          }
        });
      } else {
        socket?.on(`newMessage/${receiverId}`, r => {
          if (r.requestId === requestId) {
            setMessages((msg: any) => [r.message, ...msg]);
          }
        });
      }
    }
  }, [connected]);

  useEffect(() => {
    if (messagesSender.length !== 0) {
      if (supportId) {
        socket?.emit('supportMessage', {
          receiver: null,
          isAdmin: false,
          message: messagesSender[0].text,
          createdAt: new Date(),
          supportId: supportId,
        });
      } else {
        socket?.emit('privateMessage', {
          receiver: receiverId,
          message: messagesSender[0].text,
          createdAt: new Date(),
          requestId: requestId,
        });
      }
      setMessages((msg: any) => [messagesSender[0], ...msg]);
    }
  }, [messagesSender]);

  const onSend = (messagesSender: any) => {
    setMessagesSender(messagesSender);
  };

  const renderBubble = (props: any) => {
    const {currentMessage} = props;
    if (!supportId) {
      if (currentMessage.user._id === receiverId) {
        return (
          <View style={[styles.userMessage, {backgroundColor: colors.red}]}>
            <Image
              source={{
                uri: prodUrl + currentMessage.user.profilepic,
              }}
              style={styles.avatarStyle}
            />
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Text style={[styles.messageTextStyle, {color: colors.white}]}>
                {currentMessage.message}
              </Text>
              <Text
                style={[
                  styles.UserTimeTextStyle,
                  {
                    color: colors.white,
                  },
                ]}>
                {typeof currentMessage.createdAt === 'string'
                  ? currentMessage.createdAt.toString().slice(11, -8)
                  : currentMessage.createdAt.getHours() +
                    ':' +
                    currentMessage.createdAt.getMinutes()}
              </Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={[styles.userMessage, {alignSelf: 'flex-start'}]}>
            <Image
              source={{
                uri: prodUrl + currentMessage.user.profilepic,
              }}
              style={styles.avatarStyle}
            />
            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              {currentMessage.message ? (
                <Text style={styles.messageTextStyle}>
                  {currentMessage.message}
                </Text>
              ) : (
                <Text style={styles.messageTextStyle}>
                  {currentMessage.text}
                </Text>
              )}
              <Text style={styles.UserTimeTextStyle}>
                {typeof currentMessage.createdAt === 'string'
                  ? currentMessage.createdAt.toString().slice(11, -8)
                  : currentMessage.createdAt.getHours() +
                    ':' +
                    currentMessage.createdAt.getMinutes()}
              </Text>
            </View>
          </View>
        );
      }
    } else {
      if (currentMessage.user._id === userData._id) {
        return (
          // <View style={styles.userMessage}>
          <View
            style={[
              styles.userMessage,
              {backgroundColor: colors.black, alignSelf: 'flex-start'},
            ]}>
            <Image
              source={{
                uri: prodUrl + currentMessage.user.profilepic,
              }}
              style={styles.avatarStyle}
            />
            {currentMessage.message ? (
              <Text style={styles.messageTextStyle}>
                {currentMessage.message}
              </Text>
            ) : (
              <Text style={styles.messageTextStyle}>{currentMessage.text}</Text>
            )}
            <Text style={styles.UserTimeTextStyle}>
              {typeof currentMessage.createdAt === 'string'
                ? currentMessage.createdAt.toString().slice(11, -8)
                : currentMessage.createdAt.getHours() +
                  ':' +
                  currentMessage.createdAt.getMinutes()}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={[styles.userMessage, {backgroundColor: colors.red}]}>
            {currentMessage.user?.profilepic ? (
              <Image
                source={{
                  uri: prodUrl + currentMessage.user.profilepic,
                }}
                style={styles.avatarStyle}
              />
            ) : (
              <Avatar
                size={40}
                rounded
                icon={{name: 'person', color: colors.gray, size: 40}}
                containerStyle={styles.avatarStyle}
              />
            )}

            {/* <View
              style={{
                paddingHorizontal: wp(2),
                alignSelf: 'center',
                justifyContent: 'center',
              }}> */}
            <Text style={[styles.messageTextStyle, {color: colors.white}]}>
              {currentMessage.message}
            </Text>
            <Text
              style={[
                styles.UserTimeTextStyle,
                {
                  color: colors.white,
                },
              ]}>
              {typeof currentMessage.createdAt === 'string'
                ? currentMessage.createdAt.toString().slice(11, -8)
                : currentMessage.createdAt.getHours() +
                  ':' +
                  currentMessage.createdAt.getMinutes()}
            </Text>
            {/* </View> */}
          </View>
        );
      }
    }
  };
  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        containerStyle={[styles.inputContainer, {borderWidth: 0}]}>
        <Icon size={25} color={colors.red} name="send" />
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.inputContainer} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: wp(4),
        backgroundColor: colors.white,
        alignSelf: 'center',
      }}>
      <Header title={'Chat'} pressMethod={() => navigation.goBack()} />
      {isloading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <GiftedChat
          showAvatarForEveryMessage
          showUserAvatar
          isLoadingEarlier
          inverted
          messages={messages}
          onSend={(messagesSender: any) => onSend(messagesSender)}
          user={myData}
          renderBubble={renderBubble}
          renderAvatar={() => null}
          renderComposer={props1 => (
            <Composer {...props1} textInputStyle={{color: colors.black}} />
          )}
          renderInputToolbar={renderInputToolbar}
          messagesContainerStyle={{
            backgroundColor: 'transparent',
            width: wp(100),
            alignSelf: 'center',
            // flexWrap: 'wrap',
            paddingHorizontal: wp(2),
          }}
          placeholder={'Type message'}
          renderSend={renderSend}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  userMessage: {
    backgroundColor: colors.boxBackground,
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    maxWidth: wp(96),
    marginVertical: hp(0.3),
    paddingVertical: hp(1),
    borderRadius: 10,
  },

  inputContainer: {
    borderRadius: 15,
    marginLeft: '5%',
    marginRight: '2%',
    textAlignVertical: 'center',
    // marginTop: '5%',
    justifyContent: 'center',

    // alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.7,
    color: colors.black,
  },

  avatarStyle: {
    height: wp(10),
    width: wp(10),
    marginRight: wp(2),
    borderRadius: wp(10),
    backgroundColor: colors.white,
  },
  messageTextStyle: {
    color: colors.black,
    maxWidth: wp(75),
    flexWrap: 'wrap',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  UserTimeTextStyle: {
    color: colors.black,
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});
