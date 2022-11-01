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

interface ImyData {
  _id: string;
  profilepic: string;
}

const ChatScreen = ({navigation, route}: any) => {
  const {receiverId, requestId, supportId} = route.params;
  const {userData} = useContext(AppContext);
  const [messages, setMessages] = useState<any>([]);
  const [messagesSender, setMessagesSender] = useState<any>([]);
  const [connected, setConnected] = React.useState(false);
  const [socket, setSocket] = React.useState<Socket>();
  const [isloading, setIsloading] = useState(true);
  const [myData, setMyData] = useState<any>({});

  const getChatData = async () => {
    if (supportId) {
      getSupportChat(supportId)
        .then((result: any) => {
          setIsloading(false);
          setMyData(result.user);
          setMessages(result.chat.reverse());
        })
        .catch(error => {
          setIsloading(false);
        });
    } else {
      getChat(receiverId, requestId)
        .then((result: any) => {
          setMyData(result.userA);
          if (result.initiated === false) {
            createChat(receiverId, requestId)
              .then((result: any) => {
                result.success && setIsloading(false);
              })
              .catch(error => {
                setIsloading(false);
                if (error.response.status === 401) {
                  LogoutApi();
                  Alert.alert('Session Expired', 'Please login again');
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Welcome'}],
                    }),
                  );
                }
              });
          } else {
            setIsloading(false);
            setMessages(result.chat.reverse());
          }
        })
        .catch(error => {
          setIsloading(false);
          if (error.response.status === 401) {
            LogoutApi();
            Alert.alert('Session Expired', 'Please login again');
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          }
        });
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
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
      });
  };
  useEffect(() => {
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
              <Text style={styles.requestedUserMessageTextStyle}>
                {currentMessage.message}
              </Text>
              <Text style={styles.requestedUserTimeTextStyle}>
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
          <View style={styles.userMessage}>
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
          <View style={styles.userMessage}>
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
                icon={{name: 'person', color: 'grey', size: 40}}
                containerStyle={styles.avatarStyle}
              />
            )}

            <View style={{alignSelf: 'center', justifyContent: 'center'}}>
              <Text style={styles.requestedUserMessageTextStyle}>
                {currentMessage.message}
              </Text>
              <Text style={styles.requestedUserTimeTextStyle}>
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
    }
  };
  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        containerStyle={{
          borderWidth: 0,
          marginRight: '5%',
          marginBottom: '3%',
          color: colors.black,
        }}>
        <Icon size={25} color={colors.red} name="send" />
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderRadius: 15,
          marginLeft: '2%',
          marginRight: '2%',
          // marginTop: '5%',
          backgroundColor: 'transparent',
          borderWidth: 0.7,
          color: colors.black,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: colors.white}}>
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
            // borderRadius: 10,
            // borderWidth: 1,
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
    padding: '2%',
    maxWidth: '90%',
    marginVertical: '0.5%',
    borderRadius: 10,
  },
  // requestedUserMessage: {
  //   backgroundColor: colors.red,
  //   flexDirection: 'row',
  //   padding: '2%',
  //   maxWidth: '90%',
  //   marginVertical: '0.5%',
  //   borderRadius: 10,
  // },
  avatarStyle: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  messageTextStyle: {
    color: colors.black,
    fontWeight: 'bold',
  },
  requestedUserMessageTextStyle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  requestedUserTimeTextStyle: {
    color: colors.white,
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  UserTimeTextStyle: {
    color: colors.black,
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});
