import React, { useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView, ImageBackground, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../../API';
import { Header } from '../../components';
import { SvgXml } from 'react-native-svg';


const ViewProfile = () => {
    const [loading, setloading] = useState(false);
    const [profileData, setprofileData] = useState()

    useFocusEffect(() => {
        getUser().then((rest: any) => {
            setloading(false)
            console.log('profile', rest)
            // setprofileData(rest)
        }).catch(error => {
            Alert.alert(error.message ? error.message : 'Something went wrong');
        })
    })
    return (
        // <SafeAreaView>

        //     {isloading ?
        //         <MyLoader />
        //         :

        //         <View>
        //             <ScrollView>
        //                 <View style={styles.ViewTop}>
        //                     <ImageBackground
        //                         resizeMode='stretch'
        //                         style={{
        //                             width: '100%',
        //                             height: '100%',
        //                             // top: hp(-1),
        //                         }}
        //                         // resizeMode={'stretch'}
        //                         source={require('../assets/PROFILEpic.png')}>

        //                         <View style={styles.header}>
        //                             <Header
        //                                 title="My Profile"
        //                             // onPress={() => {
        //                             //     navigation.navigate("CompanyDrawer")
        //                             //     console.log('Error in Go Back');
        //                             // }}
        //                             />
        //                         </View>



        //                         <View style={styles.imgview}>
        //                             {!userData.profilepic ?
        //                                 <Avatar
        //                                     size={110}
        //                                     rounded
        //                                     icon={{ name: "person", color: 'grey', size: 80 }}
        //                                     containerStyle={styles.img}
        //                                 />
        //                                 :
        //                                 <Image
        //                                     source={
        //                                         {
        //                                             uri: backendUrl + userData.profilepic
        //                                         }
        //                                     }
        //                                     style={styles.img}
        //                                 />


        //                             }
        //                             <TouchableOpacity style={{
        //                                 position: 'absolute',
        //                                 top: hp(14),
        //                                 right: 15,
        //                             }}>
        //                                 <SvgXml style={styles.CameraSvg} xml={cameraSvg} width={25} />
        //                             </TouchableOpacity>
        //                         </View>
        //                     </ImageBackground>
        //                 </View>

        //                 <View style={styles.ViewDetails}>
        //                     <View style={styles.editContainer}>
        //                         <TouchableOpacity onPress={() => navigation.navigate('EditMyProfile')}>
        //                             <Text style={styles.editText}>
        //                                 Edit
        //                             </Text>
        //                         </TouchableOpacity>
        //                     </View>
        //                     <Text style={{ fontSize: 15, marginLeft: 6 }}>
        //                         Name
        //                     </Text>
        //                     <View style={styles.viewunderline}>
        //                         <View>
        //                             <SvgXml
        //                                 // style={styles.svg}
        //                                 xml={profileSvg}
        //                                 width={25}
        //                             // width={75}
        //                             // height={75}
        //                             />
        //                         </View>
        //                         <View style={{ paddingLeft: wp(3.5) }}>
        //                             <Text style={styles.txtdetail}>{userData?.firstname + ' ' + userData?.lastname}</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
        //                         Email
        //                     </Text>
        //                     <View style={styles.viewunderline}>
        //                         <View>
        //                             <SvgXml style={styles.svg} xml={mailSvg} width={25} />
        //                         </View>
        //                         <View style={{ paddingLeft: wp(3.5) }}>
        //                             <Text style={styles.txtdetail}>{userData?.email}</Text>
        //                         </View>
        //                     </View>
        //                     <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
        //                         Address
        //                     </Text>
        //                     <View style={styles.viewunderline}>
        //                         <View>
        //                             <SvgXml style={styles.svg} xml={location2Svg} width={25} />
        //                         </View>
        //                         <View style={{ paddingLeft: wp(3.5) }}>
        //                             <Text style={styles.txtdetail}>{userData?.address}</Text>
        //                         </View>
        //                     </View>


        //                     {userData.role === "Driver" || userData.role === "Provider"
        //                         ?
        //                         <View
        //                             style={{
        //                                 flexDirection: 'row',
        //                                 paddingVertical: hp(1),
        //                                 justifyContent: 'space-between',
        //                             }}>
        //                             <View
        //                                 style={{
        //                                     flexDirection: 'row',
        //                                 }}>
        //                                 <View>
        //                                     <SvgXml style={styles.svg} xml={settingSvg} width={25} />
        //                                 </View>
        //                                 <View style={{ paddingLeft: wp(5) }}>
        //                                     <Text style={styles.txtdetail}>Setting</Text>
        //                                 </View>
        //                             </View>

        //                             <View>
        //                                 <TouchableOpacity>
        //                                     <AntDesign
        //                                         name="right"
        //                                         color={'#000'}
        //                                         size={wp(5)}
        //                                         onPress={() =>
        //                                             navigation.dispatch(DrawerActions.openDrawer())
        //                                         }
        //                                     // onPress={() => console.log('adasdsefsssd')}
        //                                     />
        //                                 </TouchableOpacity>
        //                             </View>
        //                         </View> : null
        //                     }
        //                 </View>
        //             </ScrollView>
        //         </View>
        //     }
        // </SafeAreaView>
        <SafeAreaView></SafeAreaView>
    );
}

export default ViewProfile;