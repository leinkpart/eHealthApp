import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import database from '@react-native-firebase/database';
import {Pedometer} from 'react-native-sensors';
import firestore from '@react-native-firebase/firestore';


// Thành phần HeaderSection
const HeaderSection = ({ percentage }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>WALKING DAILY</Text>
    <Text style={styles.percentageText}>
      You have done <Text style={styles.highlight}>{percentage}%</Text> target (10.000 steps/day)
    </Text>

    <Text style={styles.noteText}>The CDC recommends that most people set a goal of walking up to 10,000 steps per day — a distance equivalent to about 8km to help boost overall health.</Text>
  </View>
);

// Thành phần StatSection
const StatSection = ({ calories, distance, duration }) => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Icon name="fire" size={30} color="#FF6699" />
      <Text style={styles.statText}>{calories} kcal</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="map-marker-distance" size={30} color="#A26DF9" />
      <Text style={styles.statText}>{distance} km</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="clock-outline" size={30} color="#3366CC" />
      <Text style={styles.statText}>{duration} min</Text>
    </View>
  </View>
);

// Thành phần GraphSection
const GraphSection = ({ weeklyData }) => (
  <View>
    <LineChart
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: weeklyData,
          },
        ],
      }}
      width={390}
      height={290}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={{
        backgroundGradientFrom: '#99FFFF',
        backgroundGradientTo: '#99FFFF',
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
  // Thành phần CircularProgress
  const CircularProgress = ({ percentage }) => {
    const radius = 70;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (percentage / 100) * circumference;
    const StepWalking = walkingData.steps
  
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
          <Text style={styles.stepsText}>{StepWalking}</Text>
          <Text style={styles.label}>Steps</Text>
        </View>
      </View>
    );
  };

  const [walkingData, setWalkingData] = useState({
    steps: 0,
    percentage: 0,
    calories: 0,
    distance: 0,
    duration: 0,
    weeklyData: [0, 0, 0, 0, 0, 0, 0],
  });

  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

  // Sử dụng pedometer để đếm bước chân
  // useEffect(() => {
  //   let pedometerSubscription = null;

  //   // Kiểm tra xem thiết bị có hỗ trợ Pedometer không
  //   Pedometer.isAvailable().then(
  //     (available) => {
  //       setIsPedometerAvailable(available);
  //       if (available) {
  //         // Lắng nghe số bước chân từ cảm biến Pedometer
  //         pedometerSubscription = Pedometer.watchStepCount(result => {
  //           setWalkingData((prevState) => ({
  //             ...prevState,
  //             steps: result.steps, // Cập nhật số bước đi từ cảm biến
  //             percentage: (result.steps / 10000) * 100, //  10,000 bước là mục tiêu trong ngày
  //           }));
  //         });
  //       } else {
  //         console.log("Pedometer is not available");
  //         // Xử lý trường hợp không có cảm biến Pedometer
  //       }
  //     },
  //     (error) => console.error(error)
  //   );

  //   return () => {
  //     // Dừng theo dõi Pedometer khi component bị hủy
  //     pedometerSubscription && pedometerSubscription.stop();
  //   };
  // }, []);

  useEffect(() => {
    const onValueChange = database()
      .ref('/walkingData')
      .on('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          setWalkingData({
            steps: data.steps || 0,
            percentage: data.percentage || 0,
            calories: data.calories || 0,
            distance: data.distance || 0,
            duration: data.duration || 0,
            weeklyData: data.weeklyData || [0, 0, 0, 0, 0, 0, 0],
          });
        }
      });     
    return () => database().ref('/walkingData').off('value', onValueChange);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderSection percentage={walkingData.percentage} />
        <CircularProgress percentage={walkingData.percentage} />
        <Text style={styles.titleTxt}>Today</Text>
        <StatSection
          calories={walkingData.calories}
          distance={walkingData.distance}
          duration={walkingData.duration}
        />

        <View style={styles.weeklyCont}>
          <GraphSection weeklyData={walkingData.weeklyData} />
        </View>
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

  scrollViewContent: {
    paddingBottom: 100,
  },

  headerContainer: {
    alignItems: 'center',
    marginVertical: 10,
    margin: 10,
  },

  title: {
    fontSize: 18,
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

  noteText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
    padding: 5,
  },

  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  titleTxt: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 25,
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

  weeklyCont: {
    alignItems: 'center',
  },
});

export default WalkingScreen;
