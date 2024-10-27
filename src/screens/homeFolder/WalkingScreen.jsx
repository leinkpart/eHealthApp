import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import firestore from '@react-native-firebase/firestore';

const DAILY_STEP_GOAL = 10000;
const STEP_LENGTH = 0.762; // Average step length in meters
const CALORIES_PER_STEP = 0.04;

const HeaderSection = ({ percentage }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>WALKING DAILY</Text>
    <Text style={styles.percentageText}>
      You have done <Text style={styles.highlight}>{percentage.toFixed(1)}%</Text> of target ({DAILY_STEP_GOAL} steps/day)
    </Text>
    <Text style={styles.noteText}>The CDC recommends that most people set a goal of walking up to 10,000 steps per day — a distance equivalent to about 8km to help boost overall health.</Text>
  </View>
);

const StatSection = ({ calories, distance, duration }) => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Icon name="fire" size={30} color="#FF6699" />
      <Text style={styles.statText}>{calories.toFixed(0)} kcal</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="map-marker-distance" size={30} color="#A26DF9" />
      <Text style={styles.statText}>{distance.toFixed(2)} km</Text>
    </View>
    <View style={styles.statItem}>
      <Icon name="clock-outline" size={30} color="#3366CC" />
      <Text style={styles.statText}>{duration.toFixed(0)} min</Text>
    </View>
  </View>
);

const GraphSection = ({ weeklyData }) => (
  <View style={styles.graphContainer}>
    <Text style={styles.graphTitle}>Weekly Progress</Text>
    <LineChart
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: weeklyData }],
      }}
      width={390}
      height={290}
      chartConfig={{
        backgroundColor: '#99ffff',
        backgroundGradientFrom: '#99ffff',
        backgroundGradientTo: '#99ffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
        style: { borderRadius: 16 },
      }}
      bezier
      style={styles.chart}
    />
  </View>
);

const CircularProgress = ({ steps, percentage }) => {
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
        <Text style={styles.stepsText}>{steps}</Text>
        <Text style={styles.label}>Steps</Text>
      </View>
    </View>
  );
};

export default function WalkingScreen() {
  const [walkingData, setWalkingData] = useState({
    steps: 0,
    percentage: 0,
    calories: 0,
    distance: 0,
    duration: 0,
    weeklyData: [0, 0, 0, 0, 0, 0, 0],
  });

  const [lastAccel, setLastAccel] = useState({ x: 0, y: 0, z: 0 });
  const [lastGyro, setLastGyro] = useState({ x: 0, y: 0, z: 0 });
  const [potentialStep, setPotentialStep] = useState(false);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    setUpdateIntervalForType(SensorTypes.gyroscope, 100);

    const accelSubscription = accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitude - 9.8); // Subtracting Earth's gravity

      if (delta > 1.5 && !potentialStep) {
        setPotentialStep(true);
      }

      setLastAccel({ x, y, z });
    });

    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      const rotationRate = Math.sqrt(x * x + y * y + z * z);

      if (potentialStep && rotationRate > 1.5) {
        setWalkingData(prevData => {
          const newSteps = prevData.steps + 1;
          const newPercentage = (newSteps / DAILY_STEP_GOAL) * 100;
          const newDistance = (newSteps * STEP_LENGTH) / 1000; // Convert to km
          const newCalories = newSteps * CALORIES_PER_STEP;
          const newDuration = newSteps * 0.0166; // Approximate duration in minutes

          // Update weekly data (assuming index 6 is today)
          const newWeeklyData = [...prevData.weeklyData];
          newWeeklyData[6] = newSteps;

          const newData = {
            steps: newSteps,
            percentage: newPercentage,
            calories: newCalories,
            distance: newDistance,
            duration: newDuration,
            weeklyData: newWeeklyData,
          };
          // Save data to Firestore
          saveDataToFirestore(newData);

          return newData;
        });

        setPotentialStep(false);
      }

      setLastGyro({ x, y, z });
    });

    return () => {
      accelSubscription.unsubscribe();
      gyroSubscription.unsubscribe();
    };
  }, [potentialStep]);

  const saveDataToFirestore = async (data) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      await firestore()
        .collection('walkingData')
        .doc(currentDate)
        .set({
          steps: data.steps,
          percentage: data.percentage,
          calories: data.calories,
          distance: data.distance,
          duration: data.duration,
          timestamp: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      console.log('Data saved to Firestore');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderSection percentage={walkingData.percentage} />
        <CircularProgress steps={walkingData.steps} percentage={walkingData.percentage} />
        <StatSection
          calories={walkingData.calories}
          distance={walkingData.distance}
          duration={walkingData.duration}
        />
        <GraphSection weeklyData={walkingData.weeklyData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 16,
    color: '#666',
  },
  highlight: {
    color: '#7B61FF',
    fontWeight: 'bold',
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
  },
  graphContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});