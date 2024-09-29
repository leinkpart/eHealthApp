import React, {useState, useEffect, useRef} from 'react';
import { 
    View, 
    Text,  
    Keyboard, 
    TextInput, 
    StyleSheet, 
    Pressable, 
    TouchableOpacity,
    Alert, 
    ScrollView, 
    } from 'react-native';
import { Switch, TouchableWithoutFeedback, Animated } from 'react-native';

import IconForward from 'react-native-vector-icons/Ionicons'

import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddReminder = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    const handleAdd = () => {
  
        // Lưu lời nhắc mới vào cơ sở dữ liệu hoặc thực hiện các hành động khác
        // ...
    
        // Xóa nội dung input
        //setTitle('');
        //setDescription('');
    
        navigation.goBack();
    
        // Ẩn bàn phím
        Keyboard.dismiss();
    
        Alert.alert('Notification', 'Add Successful Reminder!');
    };
  
    const isTitleEmpty = title.trim() === '';
  
    const [isDateEnabled, setIsDateEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Ngày hiện tại
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isTimeEnabled, setIsTimeEnabled] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date()); // Giờ hiện tại
    //const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const animatedHeightDate = useRef(new Animated.Value(0)).current; 
    const animatedHeightTime = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedHeightDate, {
            toValue: isDateEnabled ? 95 : 0, // Adjust the height value as needed
            duration: 300, // Duration for the animation
            useNativeDriver: false,
        }).start();
    }, [isDateEnabled]);
    
    
    useEffect(() => {
        Animated.timing(animatedHeightTime, {
            toValue: isTimeEnabled ? 80 : 0, // Adjust the height value as needed
            duration: 300, // Duration for the animation
            useNativeDriver: false,
        }).start();
    }, [isTimeEnabled]);

    const toggleDateSwitch = () => setIsDateEnabled(previousState => !previousState);

    const toggleTimeSwitch = () => {
        setIsTimeEnabled((previousState) => {
            if (!previousState) {
                setIsDateEnabled(true);
            }
            return !previousState;
        });
    };

    const onChangeDate = (event, date) => {
        if (date) {
            const today = new Date();

            if (date < today) {
                Alert.alert('Error', 'The selected date cannot be less than the present date.');
                // Reset lại ngày hiện tại nếu ngày chọn nhỏ hơn ngày hiện tại
                setSelectedDate(today);
                setShowDatePicker(false); // Đóng picker lại sau khi reset
            } else {
                setSelectedDate(date); // Cập nhật nếu ngày hợp lệ
                setShowDatePicker(false); // Đóng picker lại sau khi chọn thành công
            }
        }
    };

    const showDate = () => {
        setShowDatePicker(true);
    };

    const showTime = () => {
        setTimePickerVisibility(true)
    };
    
    const hideTime = () => {
        setTimePickerVisibility(false)
    };
      
    const handleConfirm = (time) => {
        setSelectedTime(time);
        hideTime();
    };

    const detailReminder = () => {
        navigation.navigate('Details');
    }
  
    return (   
        <View style={styles.container}>
            <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>

                <View style={styles.headerAddReminder}>
                    <Pressable style={styles.btnClose} onPress={() => navigation.goBack()} >
                        <Text style={styles.CloseTxt}>Cancel</Text>
                    </Pressable>
        
                    <Text style={styles.newReminderTxt}>New reminder</Text>
                
                    <Pressable 
                        style={styles.btnAdd}
                        onPress={handleAdd}
                        disabled={isTitleEmpty}>
                        <Text style={[styles.AddTxt, isTitleEmpty && styles.AddTxtDisabled]}>Add</Text>
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
    
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.titleContent}
                        placeholder="Title"
                        placeholderTextColor="#777"
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
        
                    <View style={styles.separator} />
        
                    < ScrollView contentContainerStyle={styles.scrollNoteContent}>
                        <TextInput
                            style={styles.noteContent}
                            placeholder="Notes"
                            placeholderTextColor="#777"
                            multiline
                            numberOfLines={6}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </ScrollView>
                </View>
    
                <View style={styles.detailContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dayText}>Day</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#008b8b" }}
                            thumbColor={isDateEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleDateSwitch}
                            value={isDateEnabled}
                        />
                    </View>

                    <Animated.View style={[styles.calendarContainer, { height: animatedHeightDate }]}>
                    {isDateEnabled && (
                        <>
                            <Text style={styles.selectedDateText}>
                                {selectedDate.toLocaleDateString('vi-VN')}
                            </Text>

                            <View style={styles.openDate}>
                                <Text style={styles.openPickerText} onPress={showDate}>
                                    Select day
                                </Text>

                                {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                    style={styles.datePicker}
                                />
                            )}
                            </View>
                        </>
                    )}
                    </Animated.View>

                    <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>Time</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#008b8b" }}
                            thumbColor={isTimeEnabled ? "#f5dd4b" : "#f4f3f4"}
                            androi_backgroungColor="#3e3e3e"
                            onValueChange={toggleTimeSwitch}
                            value={isTimeEnabled}
                        />
                    </View>

                    <Animated.View style={[styles.timeModeContainer, { height: animatedHeightTime }]}>
                    {isTimeEnabled && ( 
                        <>
                            <Text style={styles.selectedTimeText}>
                                {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Text>

                            <Text style={styles.openTimeText} onPress={showTime}>Select time</Text>
                            
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideTime}
                                // Bạn có thể điều chỉnh giao diện của modal ở đây
                                // ví dụ: thêm style cho modal
                                time={selectedTime} // Chọn ngày mặc định
                                textColor="#FFFFFF" // Màu chữ trắng cho giao diện tối
                                //headerTextIOS="Chọn ngày"
                                isDarkModeEnabled={true}                         
                            />
                        </>
                    )}
                    </Animated.View>

                    <TouchableOpacity style={styles.detailBtn} >
                        <Text style={styles.detailText}>Details</Text>
                        <IconForward name="chevron-forward" style={styles.iconForward} />
                    </TouchableOpacity>
                </View>
    
            </ScrollView>
        </View>     
    );
};

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#eddfe0',
        flex: 1
    },
  
    headerAddReminder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderColor: 'gray'     
    },
  
    CloseTxt: {
        fontSize: 16,
        color: '#ff5c5c',
        fontWeight: '550'
    },
  
    newReminderTxt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
    },
  
    AddTxtDisabled: {
        color: '#777', 
    },
  
    AddTxt: {
        fontSize: 16,
        color: '#00C853',
        fontWeight: '550'
    },
  
    scrollContainer: {
        flexGrow: 1,
        height: 140,
    },
  
    contentContainer: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 20,
        padding: 15,
        height: 220,
    },
  
    titleContent: {
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 4,
        color: '#000',
        fontSize: 20,
    },
  
    separator: {
        height: 1,
        backgroundColor: '#006666',
        marginBottom: 10,
    },
  
    scrollNoteContent: {
        height: 145,
    },
  
    noteContent: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 4,
        color: '#000',
        fontSize: 18,
    },

    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF6EA',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },

    dayText: {
        color: '#000',
        fontSize: 18,
    },

    calendarContainer: {
        backgroundColor: '#FFF6EA',
        borderRadius: 10,
        marginTop: 1,
        overflow: 'hidden',
    },

    selectedDateText: {
        color: '#000',
        fontSize: 18,
        marginBottom: 10,
        paddingTop: 10,
        paddingLeft: 17
    },

    openDate: {
        flexDirection: 'row',
        paddingRight: 100,
        paddingLeft: 17,
    },
    
    openPickerText: {
        color: '#81b0ff',
        fontSize: 16,
    },

    datePicker: {
        width: '100%',
    },

    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#FFF6EA',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },
    
    timeText: {
        color: '#000',
        fontSize: 18,
    },

    timeModeContainer: {
        backgroundColor: '#FFF6EA',
        borderRadius: 10,
        marginTop: 1,
        overflow: 'hidden',
    },
    
    selectedTimeText: {
        color: '#000',
        fontSize: 18,
        marginBottom: 10,
        paddingTop: 10,
        paddingLeft: 17,
        fontWeight: '700',  
    },
    
  
    detailContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 14,
    },

    openTimeText: {
        color: '#81b0ff',
        fontSize: 16,
        paddingLeft: 17
    },
  
    detailBtn: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
  
    detailText: {
        color: '#000',
        fontSize: 18,
    },
  
    iconForward: {
        color: '#000',
        fontSize: 20,
    },
  
});
  
export default AddReminder
