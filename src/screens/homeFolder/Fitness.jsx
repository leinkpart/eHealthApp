import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YouTubeIframe from 'react-native-youtube-iframe';

// Dữ liệu bài tập đã cập nhật
const fitnessData = [
    {
        id: '1',
        title: '30 Min Cardio HIIT Workout To Burn Calories - Full Body Workout At Home (No Equipment, No Repeat)',
        userPost: 'Oliver Sjostrom',
        duration: '30 min',
        videoId: 'onY-vv46tpU', // ID video YouTube
        thumbnailUrl: 'https://img.youtube.com/vi/onY-vv46tpU/default.jpg',
    },
    {
        id: '2',
        title: '20 Min BEGINNER CARDIO Workout For Fat Burn (No Equipment, At Home)',
        userPost: 'Oliver Sjostrom',
        duration: '20 min',
        videoId: 'vnBXaCsoEPU',
        thumbnailUrl: 'https://img.youtube.com/vi/vnBXaCsoEPU/default.jpg',
    },
    {
        id: '3',
        title: '20 MIN FAT BURNING CARDIO WORKOUT (NO EQUIPMENT)',
        userPost: '재호 - Fitness',
        duration: '20 min',
        videoId: 'Pv6NrM7fqHY',
        thumbnailUrl: 'https://img.youtube.com/vi/Pv6NrM7fqHY/default.jpg',
    },
    {
        id: '4',
        title: 'Do THIS 30 Min HIIT Workout to ACTUALLY Burn Fat! No Equipment Needed',
        userPost: 'TIFF x DAN',
        duration: '30 min',
        videoId: '4nPKyvKmFi0',
        thumbnailUrl: 'https://img.youtube.com/vi/4nPKyvKmFi0/default.jpg',
    },
    {
        id: '5',
        title: 'New Killer Fat-Burning Home Cardio! (Level 4 EX)',
        userPost: 'Jordan Yeoh Fitness',
        duration: '20 min',
        videoId: 'ItuhDytDOYE',
        thumbnailUrl: 'https://img.youtube.com/vi/ItuhDytDOYE/default.jpg',
    },
    {
        id: '6',
        title: '30 Min FAT BURN | No Equipment',
        userPost: 'Rowan Row',
        duration: '30 min',
        videoId: 'OV8mGUgH4QA',
        thumbnailUrl: 'https://img.youtube.com/vi/OV8mGUgH4QA/default.jpg',
    },
    {
        id: '7',
        title: '10 Min Fat Burning Workout | No Equipment',
        userPost: 'THENX',
        duration: '12 min',
        videoId: 'UheajlsZ72E',
        thumbnailUrl: 'https://img.youtube.com/vi/UheajlsZ72E/default.jpg',
    },
    {
        id: '8',
        title: '20 MIN CARDIO HIIT WORKOUT - ALL STANDING - Full Body, No Equipment, No Repeats',
        userPost: 'Nobadaddiction',
        duration: '20 min',
        videoId: 'moQ9eQm6FRg',
        thumbnailUrl: 'https://img.youtube.com/vi/moQ9eQm6FRg/default.jpg',
    },
    {
        id: '9',
        title: '10 MINUTE FAT BURN WORKOUT | NO EQUIPMENT | SIMEON PANDA & AUSTIN DOTSON',
        userPost: 'Simeon Panda',
        duration: '11 min',
        videoId: 'NMSOpenaNRM',
        thumbnailUrl: 'https://img.youtube.com/vi/NMSOpenaNRM/default.jpg',
    },
    {
        id: '10',
        title: '45 MINUTE FAT MELTING HIIT CARDIO WORKOUT(1000 CALORIES)',
        userPost: 'BullyJuice',
        duration: '45 min',
        videoId: 'HzfHKN6rmpk',
        thumbnailUrl: 'https://img.youtube.com/vi/HzfHKN6rmpk/default.jpg',
    },
    {
        id: '11',
        title: 'Nếu Bạn Chưa Có 6 Múi HÃY TẬP NHƯ THẾ NÀY | 10 PHÚT TẬP BỤNG TẠI NHÀ HIỆU QUẢ (Độ Khó Trung Bình)',
        userPost: 'Văn Tới Calisthenics-Style',
        duration: '12 min',
        videoId: 'UBY1HbmClKc',
        thumbnailUrl: 'https://img.youtube.com/vi/UBY1HbmClKc/default.jpg',
    },
    {
        id: '12',
        title: '10 Phút Tập Bụng Dưới Săn Chắc Tại Nhà 🔥',
        userPost: 'Hubert Cù',
        duration: '12 min',
        videoId: 'Kg0Jhh9p9xI',
        thumbnailUrl: 'https://img.youtube.com/vi/Kg0Jhh9p9xI/default.jpg',
    },
    // Thêm nhiều bài tập khác...
];

// Component hiển thị video bài tập
const FitnessItem = ({ item }) => {
    const navigation = useNavigation();

    const onPressItem = () => {
        // Điều hướng đến màn hình phát video khi người dùng nhấn vào một bài tập
        navigation.navigate('Video', {
            videoId: item.videoId, // Truyền videoId thay vì videoUrl
            title: item.title,
        });
    };

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
            {/* Hiển thị thumbnail của video */}
            <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.userPost}</Text>
                <Text style={styles.duration}>Time: {item.duration}</Text>
            </View>
        </TouchableOpacity>
    );
};

// Màn hình hiển thị danh sách bài tập
export default function Fitness() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fitness Videos</Text>
            {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
                
            </ScrollView> */}
            <FlatList 
                data={fitnessData}
                renderItem={({ item }) => <FitnessItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 90 }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
    },

    scrollViewContent: {
        paddingBottom: 100,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    itemContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },

    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },

    infoContainer: {
        flex: 1,
        paddingLeft: 13,
    },

    title: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: 'bold',
    },

    description: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },

    duration: {
        marginTop: 4,
        fontSize: 14,
        color: '#888',
    },

    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    videoTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
