import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const SlideBar = ({ visible, onClose }) => {

    return (
        <View style={styles.container}>
            <View style={styles.containerContent}>
                
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
                <Text style={styles.title}>My Account</Text>
                <ScrollView>
                <TouchableOpacity>
                    <Text style={styles.menuItem}>Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity>
                {/* Thêm các chức năng khác ở đây */}
                </ScrollView>
            </View>          

            {/* <View style={{ 
                height: 85, 
                backgroundColor: '#eddfe0', 
                left: 0, 
                right: 0, 
                bottom: 0,
                top: '90%',
            }} /> */}
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
        width: '85%', 
        
    },
    
    containerContent: {
        //flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
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

    closeButton: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
        marginLeft: '85%'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    menuItem: {
        fontSize: 18,
        marginVertical: 10,
    },

    logout: {
        fontSize: 18,
        marginVertical: 10,

    }
});

export default SlideBar;
