import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Love = () => {
    const [liked, setLiked] = useState(false);
  
    const handlePress = () => {
        setLiked(!liked);
    };
  
    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Icon
                name={liked ? 'heart' : 'heart-o'} // 'heart' là icon đã được yêu thích, 'heart-o' là icon chưa được yêu thích
                size={24}
                color={liked ? '#ff5c5c' : '#cfcfcf'} // Thay đổi màu sắc khi được yêu thích
            />
        </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        //padding: 10,
    },
});
  
export default Love;