import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'; // Thêm dòng này
import haversine from 'haversine';

const BikeTrackingScreen = () => {
    const [distance, setDistance] = useState(0);
    const [lastPosition, setLastPosition] = useState(null);
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        const checkPermission = async () => {
        const permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // Thay đổi nếu bạn sử dụng iOS
        if (permission === RESULTS.GRANTED) {
            console.log('Permission granted');
        } else {
            Alert.alert("Không có quyền truy cập vị trí", "Vui lòng cấp quyền trong cài đặt ứng dụng.");
        }
        };

        checkPermission();
    }, []);

    useEffect(() => {
        let watchID;

        if (isTracking) {
            watchID = Geolocation.watchPosition(
                (position) => {
                const { latitude, longitude } = position.coords;
                const currentPosition = { latitude, longitude };

                if (lastPosition) {
                    const distanceTravelled = haversine(lastPosition, currentPosition, { unit: 'km' });
                    setDistance((prevDistance) => prevDistance + distanceTravelled);
                }

                setLastPosition(currentPosition);
                },
                (error) => {
                    console.log(error);
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 1,
                    interval: 1000,
                    fastestInterval: 1000,
                }
            );
        }

        return () => {
            if (watchID) {
                Geolocation.clearWatch(watchID);
            }
        };
    }, [isTracking, lastPosition]);

    const startTracking = () => {
        setIsTracking(true);
        setDistance(0);
        setLastPosition(null);
    };

    const stopTracking = () => {
        setIsTracking(false);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/cycling1.png')} // Đường dẫn đến hình ảnh
                style={styles.image} // Thêm kiểu dáng cho hình ảnh
            />

            <Text style={styles.title}>Theo Dõi Khoảng Cách Đạp Xe</Text>
            <Text style={styles.distance}>Bạn đã đạp xe được: {distance.toFixed(2)} km</Text>
            <Button title={isTracking ? "Start" : "Stop"} onPress={isTracking ? stopTracking : startTracking} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    distance: {
        fontSize: 18,
        marginBottom: 20,
    },

    image: {
        width: '95%', 
        height: '30%', 
        marginBottom: 20, 
        borderRadius: 20,
    },
});

export default BikeTrackingScreen;
