import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import IconCalender from 'react-native-vector-icons/FontAwesome5';
import IconGlassWater from 'react-native-vector-icons/FontAwesome6';
import IconNotify from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';  // Nhập thành phần thanh tiến trình hình tròn
import auth from '@react-native-firebase/auth';
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import SlideBar from '../../../component/SlideUser';


const Home = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState('');

    const [username, setUsername] = useState('');

    const [isMenuVisible, setMenuVisible] = useState(false);

    const userSlide = () => {
        setMenuVisible(!isMenuVisible);
    };

    useEffect(() => {
        const updateDate = () => {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            setCurrentDate(`${month} ${day}, ${year}`);
        };
      
        updateDate();
        const intervalId = setInterval(updateDate, 1000);
      
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const userId = auth().currentUser?.uid; // Lấy UID của người dùng đã đăng nhập
        if (userId) {
            const unsubscribe = firestore()
                .collection('users') // Thay đổi tên collection nếu cần
                .doc(userId)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        setUsername(doc.data().username); // Lấy tên người dùng từ document
                    }
                });

            return () => unsubscribe(); // Dọn dẹp subscription
        }
    }, []);

    // Thành phần Activity được cập nhật để bao gồm thanh tiến trình hình tròn
    const Activity = ({ name, time, progress, icon }) => {
        return (
            <TouchableOpacity style={styles.activity} onPress={() => navigation.navigate(name)}>

                <Image source={icon} style={styles.icon} />

                <AnimatedCircularProgress style={styles.circle}
                    size={90} // Kích thước của thanh tiến trình hình tròn
                    width={10} // Độ dày của đường tròn
                    fill={progress} // Phần trăm tiến trình
                    tintColor="#4CAF50" // Màu của phần đã hoàn thành
                    backgroundColor="#E0E0E0" // Màu của phần chưa hoàn thành
                    rotation={0} // Xoay điểm bắt đầu lên trên
                    lineCap="round" // Bo tròn các cạnh của đường tiến trình
                >
                    {
                        (fill) => (
                            <View style={styles.progressInner}>                           
                                <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>

                <View style={styles.info}>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {isMenuVisible && 
                <View style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background mờ
                    zIndex: 2,
                }}>
                    <SlideBar onClose={userSlide} />
                </View>
            }

            <View style={styles.ContainerContent}>
                <View style={styles.header}>
                    <View style={styles.userHeader}>
                        <TouchableOpacity style={styles.userAvatar} onPress={userSlide}>
                            <Image 
                                source={require('../../assets/avt_2.jpg')}
                                style={{ width: 60, height: 60, borderRadius: 30 }}
                                resizeMode="cover"
                            />

                        </TouchableOpacity>                                                

                        <View style={styles.headerCont}>
                            
                            <Text style={styles.userText}>Hi, {username}!</Text>
                        
                            <View style={styles.headerContent}>
                                <Text style={styles.dateText}>{currentDate}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.notify}>
                        <TouchableOpacity style={styles.notifyContain} onPress={() => navigation.navigate('Notify')}>
                            <IconNotify name='notifications-outline' style={styles.iconNotify} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.actTextCont}>Contents</Text>

                    <View style={styles.content}> 
                        <TouchableOpacity >
                            
                            <ImageBackground 
                                source={require('../../assets/fitness1.jpg')}
                                style={{ width: '100%', height: '100%', 
                                    borderRadius: 30, 
                                    overflow: 'hidden',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                resizeMode="cover"
                            >       
                                <Text style={styles.contentText}>Workout of the day</Text>                           
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.actText}>Your Activities</Text>

                    <View style={styles.actContain}>
                        <Activity 
                            time="30 min"
                            progress={50}
                            icon={require('../../assets/cycling.png')}
                            name="Cycling"
                        />
                        <Activity
                            name="Walking"
                            time="45 min"
                            progress={75}
                            icon={require('../../assets/walking.png')}
                        />
                        <Activity
                            name="Fitness"
                            time="60 min"
                            progress={50}
                            icon={require('../../assets/fitness2.png')}
                        />
                    </View>
                    
                    <Text style={styles.actText}>Features</Text>

                    <View style={styles.functionButton}>
                        <TouchableOpacity style={[styles.fButton, styles.button1]} onPress={() => navigation.navigate("Reminder")}>
                            <IconCalender name="calendar-plus" style={styles.Icon}></IconCalender>
                            <Text style={styles.btnText}>Reminder</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.fButton, styles.button2]}>
                            <IconCalender name="calendar-plus" style={styles.Icon}></IconCalender>
                            <Text style={styles.btnText}>Unknow</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.functionButton}>
                        <TouchableOpacity style={[styles.fButton, styles.button3]}>
                            <IconGlassWater name="glass-water-droplet" style={styles.Icon}></IconGlassWater>
                            <Text style={styles.btnText}>Water</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.fButton, styles.button4]}>
                            <IconCalender name="calendar-plus" style={styles.Icon}></IconCalender>
                            <Text style={styles.btnText}>Unknow</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#eddfe0' 
    },

    scrollViewContent: {
        paddingBottom: 200,
    },

    header: { 
        flexDirection: 'row', 
        width: '100%', 
        height: 75, 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 10 
    },

    userHeader: { 
        flexDirection: 'row' 
    },

    headerCont: { 
        paddingLeft: 10, 
        paddingTop: 10 
    },

    headerContent: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },

    dateText: { 
        fontSize: 14, 
        color: '#6439FF' 
    },

    userText: { 
        fontWeight: '700', 
        fontSize: 18, 
        color: '#55679C' 
    },

    userAvatar: { 
        height: 60, 
        width: 60, 
        backgroundColor: '#0D7C66', 
        borderRadius: 50, 
        marginLeft: 7, 
        elevation: 5, 
        overflow: 'hidden' 
    },

    notifyContain: { 
        height: 40, 
        width: 40, 
        backgroundColor: '#f1f1f1', 
        marginRight: 13, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
        elevation: 10,
    },

    iconNotify: { 
        fontSize: 33, 
        color: '#000' 
    },

    actTextCont: {
        fontSize: 28, 
        fontWeight: '700', 
        color: '#222', 
        marginLeft: 20, 
        marginTop: 15,
    },

    content: { 
        margin: 20, 
        width: '90%', 
        height: 250, 
        backgroundColor: '#758694', 
        borderRadius: 30, 
        elevation: 3, 
        marginBottom: 10 
    },

    contentText: { 
        padding: 30, 
        color: '#fff', 
        fontSize: 28, 
        fontWeight: '300', 
    },

    actText: { 
        fontSize: 28, 
        fontWeight: '700', 
        color: '#222', 
        marginBottom: 10, 
        marginLeft: 20, 
        marginTop: 13 
    },

    actContain: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row' 
    },

    activity: { 
        width: 120, 
        height: 'auto', 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 3, 
        margin: 5, 
        paddingBottom: 10 
    },

    icon: { 
        width: 45, 
        height: 45, 
        marginBottom: 10, 
        margin: 10 
    },

    circle: {
        marginLeft: 15
    },

    progressInner: { 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    progressText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#4CAF50', 
    },

    info: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
    },

    name: { 
        fontSize: 18, 
        fontWeight: 'bold' 
    },

    time: { 
        fontSize: 16, 
        color: '#666' 
    },

    functionButton: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10, 
    },

    fButton: { 
        flex: 1, 
        height: 'auto', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 10, 
        paddingBottom: 10, 
        borderRadius: 20, 
        elevation: 2,
        paddingTop: 20, 
    },

    button1: { backgroundColor: '#E8B86D' },

    button2: { backgroundColor: '#00CCDD' },

    button3: { backgroundColor: '#4379F2' },

    button4: { backgroundColor: '#6A9C89' },

    Icon: { 
        fontSize: 40, 
        color: '#fff', 
        marginBottom: 5,
        paddingBottom: 10, 
    },

    btnText: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#fff' 
    },
});

export default Home;
