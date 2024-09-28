// SettingsScreen

import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView} from 'react-native';
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import Icon from "react-native-vector-icons/Ionicons"
import DarkLightTheme from "react-native-vector-icons/MaterialCommunityIcons"
import DarkTheme from "react-native-vector-icons/MaterialIcons";
import LightTheme from "react-native-vector-icons/Feather";

const SettingsScreen = () => {
    const [theme, setTheme] = useState('automatic');
    const [shakeDevice, setShakeDevice] = useState(false);
    const [threeFingerLongPress, setThreeFingerLongPress] = useState(false);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const handleShakeDeviceChange = () => {
        setShakeDevice(!shakeDevice);
    };

    const handleThreeFingerLongPressChange = () => {
        setThreeFingerLongPress(!threeFingerLongPress);
    };

    return (      
        <View style={styles.container}>
            <ScrollView ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.header}>Theme</Text>

                <View style={styles.box}>
                    <View style={styles.option}>  
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => handleThemeChange('automatic')}>
                            <View style={styles.IconView}>
                                <DarkLightTheme name="theme-light-dark" style={styles.IconStyle} />
                                <Text 
                                    style={[styles.optionText, { color: theme === 'automatic' ? '#00C853' : '#000' }]}> 
                                    Automatic
                                </Text>
                            </View>

                            <Icon 
                                name={theme === 'automatic' ? 'radio-button-on' : 'radio-button-off'} 
                                size={24} 
                                color={theme === 'automatic' ? '#00C853' : '#000'} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.option}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => handleThemeChange('light')}>
                            <View style={styles.IconView}>
                                <LightTheme name="sun" style={styles.IconStyle} />
                                <Text
                                    style={[styles.optionText, { color: theme === 'light' ? '#00C853' : '#000' }]}
                                > Light
                                </Text>
                            </View>

                            <Icon 
                                name={theme === 'light' ? 'radio-button-on' : 'radio-button-off'} 
                                size={24} 
                                color={theme === 'light' ? '#00C853' : '#000'} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.option}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={() => handleThemeChange('dark')}>
                            <View style={styles.IconView}>
                                <DarkTheme name="dark-mode" style={styles.IconStyle} />
                                <Text
                                    style={[styles.optionText, { color: theme === 'dark' ? '#00C853' : '#000' }]}
                                > Dark                 
                                </Text>
                            </View>

                            <Icon 
                                name={theme === 'dark' ? 'radio-button-on' : 'radio-button-off'} 
                                size={24} 
                                color={theme === 'dark' ? '#00C853' : '#000'} 
                                style={styles.icon} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.note}>
                    Automatic is only supported on operating systems that allow you to control the system-wide color scheme.
                </Text>

                <Text style={[styles.header, { marginTop: 20 }]}>Developer Menu Gestures</Text>
                
                <View style={styles.switchBox}>
                    <View style={styles.switchOption}>               
                        <Text style={[styles.optionText, {marginLeft: 16}]}>Shake device</Text>
                        <Switch
                        value={shakeDevice}
                        onValueChange={handleShakeDeviceChange}
                        trackColor={{ false: '#767577', true: '#008b8b' }}
                        thumbColor={shakeDevice ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.switchOption}>
                        <Text style={[styles.optionText, {marginLeft: 16}]}>Three-finger long press</Text>
                        <Switch
                        value={threeFingerLongPress}
                        onValueChange={handleThreeFingerLongPressChange}
                        trackColor={{ false: '#767577', true: '#008b8b' }}
                        thumbColor={threeFingerLongPress ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>
                </View>

                <Text style={styles.note}>
                    Selected gestures will toggle the developer menu while inside an experience. The menu allows you to reload or return to home in a published experience, and exposes developer tools in development mode.
                </Text>
            </ScrollView>
        </View>       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eddfe0',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    scrollContent: {
        height: 'auto',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        marginLeft: 15,
        paddingTop: 10,
    },
    box: {
        width: 375,
        height: 'auto',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 15,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
        marginTop: 2
    },
    optionButton: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        width: 360,
    },
    IconView: {
        flexDirection: 'row',
        alignItems: 'center',       
    },
    IconStyle: {
        fontSize: 26,
        color: '#000',
    },
    switchBox: {
        width: 375,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
    },
    switchOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#000',
    },
    icon: {
        marginLeft: 10,
    },
    optionText: {
        color: '#000',
        fontSize: 19,
        paddingLeft: 10,
        fontWeight: '800',
    },
    selectedOption: {
        fontWeight: 'bold',
    },
    note: {
        color: '#808080',
        fontSize: 14,
        marginTop: 20,
        marginLeft: 25
    },
});

export default SettingsScreen;
