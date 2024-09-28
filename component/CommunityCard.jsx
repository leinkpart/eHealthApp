import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Love from './LoveButton'
import Icon from 'react-native-vector-icons/FontAwesome'


// Component hiển thị một bài đăng
const PostComponent = ({ post }) => {
  // Hàm này kiểm tra số lượng ảnh trong bài đăng để hiển thị đúng cách
  const renderImages = () => {
    if (post.images.length === 1) {
      // Nếu chỉ có một ảnh, ảnh sẽ chiếm toàn bộ chiều rộng
      return <Image source={{ uri: post.images[0] }} style={styles.singleImage} />;
    } else if (post.images.length > 1) {
      // Nếu có nhiều ảnh, sử dụng cách bố trí dạng lưới
      return (
        <View style={styles.imageGrid}>
          {post.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.multipleImage} />
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Phần đầu của bài đăng, bao gồm ảnh đại diện, tên người đăng, thời gian */}
        <View style={styles.header}>
            <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
            <View>
                <Text style={styles.userName}>{post.userName}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
            </View>
            {/* Nút hiển thị thêm tùy chọn (dấu ba chấm) */}
            <TouchableOpacity style={styles.optionsButton}>
                <Text>...</Text>
            </TouchableOpacity>
        </View>

        {/* Phần văn bản của bài đăng */}
        <Text style={styles.postText}>{post.text}</Text>
        
        {/* Hiển thị ảnh của bài đăng */}
        {renderImages()}

        {/* Phần cuối của bài đăng, bao gồm số lượng lượt thích, bình luận và nút chia sẻ */}
        <View style={styles.footer}>
            
            <Text style={styles.iconText}><Love /> {post.likes} </Text>
            <Text style={styles.iconText}>💬 {post.comments}</Text>
            <TouchableOpacity>
            <Text style={styles.shareText}>Chia sẻ</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

// Đây là thành phần chính của ứng dụng
export default function Community() {
    // Dữ liệu mẫu cho một bài đăng
    const post = [{
        userName: 'Jessica Mendez',
        userAvatar: 'https://example.com/avatar.jpg',
        time: '10m ago',
        text: 'A Delicous breakfast on weekend #brekkie',
        images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
        ], // Thay bằng một hoặc nhiều ảnh thật
        likes: 45,
        comments: 4,
    },
    {
        userName: 'John Doe',
        userAvatar: 'https://example.com/avatar2.jpg',
        time: '1h ago',
        text: 'Just had a great workout! #fitness',
        images: [
        'https://example.com/image4.jpg',
        'https://example.com/image5.jpg',
        ],
        likes: 23,
        comments: 2,
    },
    {
        userName: 'Jane Doe',
        userAvatar: 'https://example.com/avatar3.jpg',
        time: '2h ago',
        text: 'Just had a great day at the beach! #beachlife',
        images: [
        'https://example.com/image6.jpg',
        'https://example.com/image7.jpg',
        'https://example.com/image8.jpg',
        ],
        likes: 56,
        comments: 6,
    },];

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ContData}>
            <ScrollView>
                {post.map((post, index) => (
                    <PostComponent key={index} post={post} />
                ))}
            </ScrollView>
            </TouchableOpacity>
            <View style={{height: 85, backgroundColor: '#eddfe0'}} />
        </View>
    );
}

// Phần CSS để thiết kế giao diện
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#C1D8C3',
    },

    postContainer: {
        backgroundColor: '#fff',
        margin: 7,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 5,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },

    userName: {
        fontWeight: 'bold',
    },

    postTime: {
        color: '#aaa',
        fontSize: 12,
    },

    optionsButton: {
        marginLeft: 'auto',
    },

    postText: {
        marginBottom: 10,
    },

    singleImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },

    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    multipleImage: {
        width: '48%',
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    iconText: {
        color: '#555',
    },

    shareText: {
        color: '#007bff',
    },
});

