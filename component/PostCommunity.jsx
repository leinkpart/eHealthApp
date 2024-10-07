import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Love from './LoveButton';
import Icon from 'react-native-vector-icons/Entypo';
import Comment from 'react-native-vector-icons/Fontisto';


// Component hiển thị một bài đăng
const PostComponent = ({ post }) => {
  const renderImages = () => {
    if (post.images.length === 1) {
      return <Image source={{ uri: post.images[0] }} style={styles.singleImage} />;
    } else if (post.images.length > 1) {
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
      <View style={styles.header}>
        <Image source={{ uri: post.userAvatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Icon name="dots-three-horizontal" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postText}>{post.text}</Text>

      {renderImages()}

      <View style={styles.separator}></View>

      <View style={styles.footer}>
        <Text style={styles.iconText}><Love likes={post.likes}/></Text>
        <TouchableOpacity style={styles.iconCommnent}>
            <Comment name='comment' style={{fontSize: 24}}/>  
          <Text style={styles.iconText}> {post.comments}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.shareText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({

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
    fontSize: 18,
    color: '#222'
  },
  postTime: {
    color: '#aaa',
    fontSize: 13,
  },
  optionsButton: {
    marginLeft: 'auto',
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText: {
    marginBottom: 15,
    fontSize: 16,
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

  separator: {
    height: 0.5,
    backgroundColor: '#999',
    width: '80%',
    left: '10%',
    marginBottom: 10,
    marginTop: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconText: {
    color: '#555',
    marginTop: 2,
    fontSize: 16,
  },

  shareText: {
    color: '#007bff',
  },

  iconCommnent: {
    flexDirection: 'row'
  }
});
