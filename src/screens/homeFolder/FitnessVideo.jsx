import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function FitnessVideo({ route }) {
  const { videoId, title } = route.params; // Nhận thông tin từ FitnessScreen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <YoutubeIframe
        videoId={videoId} // Truyền ID của video YouTube
        height={250}
        width='100%'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
  },
});
