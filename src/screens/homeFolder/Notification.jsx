import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";

// Màn hình thông báo
const Notification = ({ navigation }) => {
    const Notify = [
        { id: 1, title: 'Thông báo 1', body: 'Đây là nội dung của thông báo 1' },
        { id: 2, title: 'Thông báo 2', body: 'Đây là nội dung của thông báo 2' },
        { id: 3, title: 'Thông báo 3', body: 'Đây là nội dung của thông báo 3' },
    ];

    // Thành phần hiển thị từng thông báo
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.notificationCard}
                //onPress={() => navigation.navigate('ManHinhChiTiet', { Notify: item })}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.body}>{item.body}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={Notify}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

// Định nghĩa styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',  // Màu nền tổng quan
    padding: 10,
  },
  notificationCard: {
    backgroundColor: '#FFF',   // Màu nền thẻ thông báo
    padding: 15,
    borderRadius: 10,          // Bo tròn các góc thẻ
    shadowColor: '#000',       // Hiệu ứng đổ bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,              // Đổ bóng cho Android
    marginVertical: 3,        // Khoảng cách giữa các thẻ thông báo
  },
  cardContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  body: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notification;
