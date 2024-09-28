import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";


const Notification = ({ navigation }) => {
    const Notify = [
        { id: 1, title: 'Thông báo 1', body: 'Đây là nội dung của thông báo 1' },
        { id: 2, title: 'Thông báo 2', body: 'Đây là nội dung của thông báo 2' },
        { id: 3, title: 'Thông báo 3', body: 'Đây là nội dung của thông báo 3' },
    ];
  
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                //onPress={() => navigation.navigate('ManHinhChiTiet', { Notify: item })}
            >
            <View>
                <Text>{item.title}</Text>
                <Text>{item.body}</Text>
            </View>
            </TouchableOpacity>
        );
    };
  
    return (
      <View>
        <FlatList
          data={Notify}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
};

export default Notification;