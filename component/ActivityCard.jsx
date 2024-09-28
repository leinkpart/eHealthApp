import React from 'react';
import { View, Text, StyleSheet, Image, progress } from 'react-native';

// Đây là component mới của Activity
const Activity = ({ name, time, progress, icon }) => {
  return (
    <View style={styles.activity}>
      <View style={styles.progress}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.progressInner}>
          <Text>{`${progress}%`}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    width: 120,
    height: 180,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },

  progress: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  progressInner: {
    height: 10,
    width: `${progress}%`,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },

  info: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default Activity;
