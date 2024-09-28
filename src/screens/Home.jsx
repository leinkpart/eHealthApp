import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image} from 'react-native';
import IconCalender from 'react-native-vector-icons/FontAwesome5';
import IconGlassWater from 'react-native-vector-icons/FontAwesome6';
import IconNotify from 'react-native-vector-icons/Ionicons';

  

const Home = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateDate = () => {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' }); // Lấy tháng theo định dạng ngắn (Sep, Oct, Nov, ...)
            const year = date.getFullYear();
            setCurrentDate(`${month} ${day}, ${year}`);
        };
      
        updateDate();
        const intervalId = setInterval(updateDate, 1000);
      
        return () => clearInterval(intervalId);
    }, []);


    // Đây là nơi định nghĩa component Activity bên trong màn hình Home
    const Activity = ({ name, time, progress, icon }) => {
        return (
           <TouchableOpacity style={styles.activity}>
                <Image source={icon} style={styles.icon} />
                <View style={styles.info}>
                <View style={styles.progress}>
                    <View style={[styles.progressInner, { width: `${progress}%` }]} />
                </View>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.name}>{name}</Text>
              </View>
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userHeader} >
                    <TouchableOpacity style={styles.userAvatar} 
                        //onPress={() => navigation.navigate('Profile')}
                    >
                        <Image 
                            source={require('../assets/avt_2.jpg')}
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <View style={styles.headerCont}>
                        <Text style={styles.userText} >Hi, Noo Phước Thịnh!</Text>

                        <View style={styles.headerContent} >
                            <Text style={styles.dateText}>{currentDate}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.notify} >
                    <TouchableOpacity style={styles.notifyContain} onPress={() => navigation.navigate('Notify')}>
                        <IconNotify name='notifications-outline' style={styles.iconNotify} />
                    </TouchableOpacity>
                </View>
                
            </View>

            <ScrollView >
                <View style={styles.content}> 
                    <Text style={styles.contentText} >I don't know what to put here!</Text>
                </View>

                <Text style={styles.actText}>Your Activities</Text>
                <View style={styles.actContain}>
                    <Activity
                        time="30 phút"
                        progress={50}
                        icon={require('../assets/cycling.png')}
                        name="Đạp xe"
                    />
                    <Activity
                        name="Đi bộ"
                        time="45 phút"
                        progress={75}
                        icon={require('../assets/walking.png')}
                    />
                    <Activity
                        name="Yoga"
                        time="60 phút"
                        progress={100}
                        icon={require('../assets/yoga.png')}
                    />
                </View>

                <Text style={styles.actText}>Reminders</Text>

                <View style={styles.functionButton}>
                    <TouchableOpacity style={[styles.fButton, styles.button1]} onPress={() => navigation.navigate("Reminder") } >
                        <IconCalender name="calendar-plus" style={styles.Icon} ></IconCalender>
                        <Text style={styles.btnText} >Reminder</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.fButton, styles.button2]} >
                        <IconCalender name="calendar-plus" style={styles.Icon} ></IconCalender>
                        <Text style={styles.btnText} >Reminder</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.functionButton}>
                    <TouchableOpacity style={[styles.fButton, styles.button3]} >
                        <IconGlassWater name="glass-water-droplet" style={styles.Icon} ></IconGlassWater>
                        <Text style={styles.btnText} >Water</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.fButton, styles.button4]} >
                        <IconCalender name="calendar-plus" style={styles.Icon} ></IconCalender>
                        <Text style={styles.btnText} >Reminder</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{height: 85, backgroundColor: '#eddfe0'}} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eddfe0',
    },

    header: {
        flexDirection: 'row',
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    userHeader: {
        flexDirection: 'row',
    },

    headerCont: {
        paddingLeft: 10,
        paddingTop: 10,
    },

    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    dateText: {
        fontSize: 14,
        color: '#6439FF',
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
        overflow: 'hidden',
    },

    notifyContain: {
        height: 40,
        width: 40,
        backgroundColor: '#f1f1f1',
        marginRight: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    iconNotify: {
        fontSize: 33,
        color: '#000'
    },

    content: {
        margin: 20,
        width: '90%',
        height: 250,
        backgroundColor: '#758694',
        borderRadius: 30,
        elevation: 10,
        marginBottom: 10,
    },

    contentText: {
        padding: 30,
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
    },

    actText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 13,
    },

    actContain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        elevation: 5,
        margin: 5,
        paddingBottom: 10,
    },
    
    circle: {
        position: 'absolute',
        // height: 90,
        // width: 90,
        // borderRadius: 50,
        // backgroundColor: '#4CAF50',
        // top: 5,
        // left: 5,
    },

    cirText: {

    },

    icon: {
        width: 45,
        height: 45,
        marginBottom: 10,
        margin: 10
    },
      
    info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    time: {
        fontSize: 16,
        color: '#666',
    },

    progress: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 10,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },

    progressInner: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
    },
    
    functionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,       
    },

    fButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 'auto',
        paddingBottom: 10,
        borderRadius: 20,
        elevation: 10,
    },

    button1: {
        backgroundColor: '#E8B86D',
    },

    button2: {
        backgroundColor: '#00CCDD',
    },

    button3: {
        backgroundColor: '#4379F2',
    },

    button4: {
        backgroundColor: '#6A9C89',
    },

    Icon: {
        fontSize: 50,
        color: '#fff',
        paddingTop: 20,
    },

    btnText: {
        fontSize: 27,
        color: '#fff',
        fontWeight: '800',
    },
});

export default Home;