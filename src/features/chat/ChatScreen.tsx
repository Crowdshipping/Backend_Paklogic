import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { prodUrl } from '../../appConstants';
import { createChat, getChat, readChat } from '../../API';
import { io, Socket } from 'socket.io-client';
import { AppContext } from '../../../App';

import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../theme';
import { Header } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ImyData {
    _id: string,
    profilepic: string
}

const ChatScreen = ({ navigation, route }: any) => {
    const { receiverId, requestId } = route.params
    const { userData } = useContext(AppContext)
    const [messages, setMessages] = useState<any>([]);
    const [messagesSender, setMessagesSender] = useState<any>([]);
    const [connected, setConnected] = React.useState(false);
    const [socket, setSocket] = React.useState<Socket>();
    const [isloading, setIsloading] = useState(true)
    const [myData, setMyData] = useState<any>({})

    const getChatData = async () => {
        getChat(receiverId, requestId)
            .then((result: any) => {
                setMyData(result.userB)
                if (result.initiated === false) {
                    createChat(receiverId, requestId)
                        .then((result: any) => {
                            result.success && setIsloading(false)
                        })
                        .catch(async error => {
                            setIsloading(false)
                            if (error.response.status === 401) {
                                await AsyncStorage.clear();
                                navigation.navigate('Welcome')
                            }
                        });
                } else {
                    setIsloading(false)
                    setMessages(result.chat.reverse())
                }
            })
            .catch(async error => {
                setIsloading(false)
                if (error.response.status === 401) {
                    await AsyncStorage.clear();
                    navigation.navigate('Welcome')
                }
            });
    };

    const setWebSocket = async () => {
        const newSocket = io(`ws://crowdshipping-chat.herokuapp.com?userId=${userData._id}`, {
            secure: true,
            transports: ['websocket'],
        });
        newSocket.on("connect", () => { setConnected(true) });
        setSocket(newSocket);
    }

    const onReadChat = async () => {
        readChat(requestId)
            .then((result: any) => {
            }).catch(async error => {
                if (error.response.status === 401) {
                    await AsyncStorage.clear();
                    navigation.navigate('Welcome')
                }
            })

    }
    useEffect(() => {
        getChatData();
        setWebSocket();
        onReadChat()
    }, [])

    useEffect(() => {
        if (connected) {
            socket?.on(`newMessage/${receiverId}`, (r) => {
                if (r.requestId === requestId) {
                    setMessages((msg: any) => [r.message, ...msg])
                }
            })
        }
    }, [connected])

    useEffect(() => {
        if (messagesSender.length !== 0) {
            socket?.emit('privateMessage', {
                receiver: receiverId,
                message: messagesSender[0].text,
                createdAt: new Date(),
                requestId: requestId
            })
            // setMessages([messagesSender[0], ...messages])
            setMessages((msg: any) => [messagesSender[0], ...msg])
        }
    }, [messagesSender])

    const onSend = (messagesSender: any) => {
        setMessagesSender(messagesSender)
    }


    const renderBubble = (props: any) => {
        const { currentMessage } = props;
        if (currentMessage.user._id === receiverId) {
            return (
                <View style={styles.requestedUserMessage}>

                    <Image source={
                        {
                            uri: prodUrl + currentMessage.user.profilepic
                        }
                    }
                        style={styles.avatarStyle}

                    />
                    <View>
                        <Text style={styles.requestedUserMessageTextStyle}>{currentMessage.message}</Text>
                        <Text style={styles.requestedUserTimeTextStyle}>{
                            typeof currentMessage.createdAt == 'string'
                                ? currentMessage.createdAt.toString().slice(11, -8)
                                : currentMessage.createdAt.getHours() + ':' + currentMessage.createdAt.getMinutes()
                        }</Text>
                    </View>

                </View>


            );
        } else {
            return (
                <View style={styles.userMessage}>
                    <Image source={
                        {
                            uri: prodUrl + currentMessage.user.profilepic
                        }
                    }
                        style={styles.avatarStyle}
                    />
                    <View>
                        {currentMessage.message ?
                            <Text style={styles.messageTextStyle}>{currentMessage.message}</Text>
                            :
                            <Text style={styles.messageTextStyle}>{currentMessage.text}</Text>
                        }
                        <Text style={styles.UserTimeTextStyle}>{
                            typeof currentMessage.createdAt == 'string'
                                ? currentMessage.createdAt.toString().slice(11, -8)
                                : currentMessage.createdAt.getHours() + ':' + currentMessage.createdAt.getMinutes()
                        }</Text>
                    </View>
                </View>
            )
        }
    }
    const renderSend = (props: any) => {
        return (
            <Send {...props} containerStyle={{ borderWidth: 0, marginRight: '5%', marginBottom: '3%' }}>
                <Icon size={25} color={colors.red} name="send" />
            </Send>

        );
    }

    const renderInputToolbar = (props: any) => {
        return <InputToolbar {...props} containerStyle={{ borderRadius: 25, marginLeft: "2%", marginRight: "2%", backgroundColor: 'transparent', borderWidth: 0.5 }} />
    }


    return (


        <SafeAreaView style={{ height: "100%", backgroundColor: colors.white }}>
            <Header title={'Chat'} pressMethod={() => navigation.goBack()} />
            {isloading ?
                <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                />
                :
                <GiftedChat
                    messages={messages}
                    onSend={(messagesSender: any) => onSend(messagesSender)}
                    user={myData}

                    renderBubble={renderBubble}
                    renderAvatar={() => null}
                    showAvatarForEveryMessage={true}

                    // inverted={true}
                    showUserAvatar={true}
                    renderInputToolbar={renderInputToolbar}
                    messagesContainerStyle={{ backgroundColor: colors.white, borderRadius: 10 }}
                    placeholder={"Type message"}
                    renderSend={renderSend}
                    isLoadingEarlier={true}
                />
            }

        </SafeAreaView>

    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    userMessage: {
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        padding: '2%',
        maxWidth: '90%',
        marginVertical: '0.5%'
    },
    requestedUserMessage: {
        backgroundColor: colors.red,
        flexDirection: 'row',
        padding: '2%',
        maxWidth: '90%',
        marginVertical: '0.5%'
    },
    avatarStyle: {
        height: 40,
        width: 40,
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: colors.white
    },
    messageTextStyle: {
        color: 'black',
        fontWeight: 'bold'
    },
    requestedUserMessageTextStyle: {
        color: colors.white,
        fontWeight: 'bold'
    },
    requestedUserTimeTextStyle: {
        color: colors.white,
        alignSelf: 'flex-end',
        fontSize: 10
    },
    UserTimeTextStyle: {
        color: 'black',
        alignSelf: 'flex-end',
        fontSize: 10
    },

});