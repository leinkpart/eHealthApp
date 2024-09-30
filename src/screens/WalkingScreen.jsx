import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';

// Thành phần CircularProgress
const CircularProgress = ({ percentage }) => {
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.circularContainer}>
      <Svg height="160" width="160">
        <Circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#EFEFEF"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#7B61FF"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={styles.centerText}>
        <Text style={styles.stepsText}>7,235</Text>
        <Text style={styles.label}>bước</Text>
      </View>
    </View>
  );
};

// Thành phần HeaderSection
const HeaderSection = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>BƯỚC ĐI HÀNG NGÀY</Text>
    <Text style={styles.percentageText}>
      Bạn đã hoàn thành <Text style={styles.highlight}>40%</Text> mục tiêu
    </Text>
  </View>
);

// Thành phần StatSection
const StatSection = () => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Icon name="fire" size={30} color="#34C3FF" />
      <Text style={styles.statText}>31 kcal</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="map-marker-distance" size={30} color="#A26DF9" />
      <Text style={styles.statText}>2 km</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="clock-outline" size={30} color="#5267FF" />
      <Text style={styles.statText}>50 phút</Text>
    </View>
  </View>
);

// Thành phần GraphSection
const GraphSection = () => (
  <View>
    <LineChart
      data={{
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        datasets: [
          {
            data: [3, 5, 4, 6, 7, 4, 8],
          },
        ],
      }}
      width={390}
      height={290}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={{
        backgroundGradientFrom: '#f3f3f3',
        backgroundGradientTo: '#f3f3f3',
        color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  </View>
);

// Kết hợp các thành phần lại trong ActivityScreen
const WalkingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderSection />
        <CircularProgress percentage={40} />
        <StatSection />
        <GraphSection />
      </ScrollView>
    </SafeAreaView>
  );
};

// Định nghĩa styles cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    color: '#AFAFAF',
    letterSpacing: 2,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
  },
  highlight: {
    color: '#7B61FF',
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#7B61FF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default WalkingScreen;
