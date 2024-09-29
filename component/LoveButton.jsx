import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Love = ({likes}) => {
    const [liked, setLiked] = useState(false);
  
    const handlePress = () => {
        setLiked(!liked);
    };
  
    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Icon
                name={liked ? 'heart' : 'heart-o'} // 'heart' là icon đã được yêu thích, 'heart-o' là icon chưa được yêu thích
                size={28}
                color={liked ? '#ff5c5c' : '#888'} // Thay đổi màu sắc khi được yêu thích
            />
            <Text style={styles.likeText}>{liked ? likes + 1 : likes}</Text>
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