import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';


const SlideBar = ({ visible, onClose }) => {

    const navigation = useNavigation();
    const handleSignOut = async () => {
        try {
            const currentUser = auth().currentUser;
            console.log("Current User: ", currentUser);
            if (currentUser) {
                // Nếu có người dùng hiện tại, tiến hành đăng xuất
                await auth().signOut();
                await AsyncStorage.removeItem('userToken');
                navigation.navigate('Login');
            } else {
                console.log("No user currently signed in.");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerContent}>
                <View style={styles.containerHeader}>
                    <Text style={styles.title}>My Account</Text>

                    <TouchableOpacity onPress={onClose} >
                        <Icon name="close" style={styles.closeButton}></Icon>
                    </TouchableOpacity>
                </View>
                
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <TouchableOpacity style={styles.containerInfo}>                   
                        <Icon name="information" style={{fontSize: 28}}></Icon>
                        <Text style={styles.menuItem}>Thông tin cá nhân</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerLogout} onPress={handleSignOut}>
                        <Icon name="log-out" style={{fontSize: 28}}></Icon>
                        <Text style={styles.logout}>Log out</Text>
                    </TouchableOpacity>
                    {/* Thêm các chức năng khác ở đây */}
                </ScrollView>
            </View>          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '89%',       
    },

    scrollViewContent: {
        paddingBottom: 200,
    },
    
    containerContent: {
        //flex: 1,
        backgroundColor: '#DBD3D3',
        //padding: 20,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#DBD3D3',
        padding: 20,
        paddingLeft: 25,
    },

    closeButton: {
        fontSize: 36,
        color: '#F95454',
    },

    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },

    box: {
        height: 50,
        width: 50,
        backgroundColor: '#444',
        borderRadius: 10,
    },

    containerInfo: {
        padding: 20,
        backgroundColor: '#fff',
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },

    menuItem: {
        fontSize: 20,
        paddingLeft: 15,
    },

    containerLogout: {
        padding: 20,
        backgroundColor: '#fff',
        marginLeft: 13,
        marginRight: 13,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },

    logout: {
        fontSize: 20,
        paddingLeft: 15,
    }
});

export default SlideBar;
