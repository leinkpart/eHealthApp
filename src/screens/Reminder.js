import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    Keyboard, 
    TouchableWithoutFeedback,
    } 
    from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Reminder = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [reminders, setReminder] = useState([
        { id: '1', title: 'Reminder 1', date: '24-12-2024', time: '10:00 AM', done: false },
        // Them loi nhac khac vao tuy y 
        { id: '2', title: 'Drink Medicine', date: '11-9-2024', time: '11:30 AM', done: false},
    ]);
  
  
    const [selectedTab, setSelectedTab] = useState('today'); // 'Hom nay', 'Lich du kien', 'Tat ca'
    
  
  
    const handleSearch = (text) => {
        setSearchQuery(text);
    };
  
    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };
  
    // const handleAddReminder = () => {
    //     navigation.navigate('AddReminder')
    // };
  
    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };
  
    const renderItem = ({ item }) => (
        <View style={styles.reminderItem}>
            <Text style={styles.reminderTitle}>{item.title}</Text>
            <Text style={styles.reminderDate}>{item.date}</Text>
            <Text style={styles.reminderTime}>{item.time}</Text>
            {/* Them cac thanh phan khac cho loi nhac*/}
        </View>
    );
  
    const filteredReminders = reminders.filter((reminder) => {
        return reminder.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    const remindersToDisplay = () => {
        switch (selectedTab) {
            case 'today':
                return filteredReminders.filter((reminder) => {
                    // Kiem tra xem loi nhac co trong hom nay khong
                });
            case 'scheduled':
                return filteredReminders.filter((reminder) => {
                    // Kiem tra loi nhac co duoc len lich truoc khong
                });
            case 'all':
                return filteredReminders;
            default:
            return filteredReminders;
        }
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Icon name="magnify" size={30} color="#c0c0c0" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#777"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
    
            <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
                <View style={styles.tabs}>
                    <TouchableOpacity
                        onPress={() => handleTabPress('today')}
                        style={[styles.tab, selectedTab === 'today' && styles.activeTab]}
                        >
                        <Icon
                            name="calendar-today"
                            size={24}
                            color={selectedTab === 'today' ? '#fff' : '#666'}
                        />
                        <Text
                            style={[
                            styles.tabText,
                            {
                                color: selectedTab === 'today' ? '#fff' : '#666',
                                fontWeight: selectedTab === 'today' ? 'bold' : 'normal'
                            }
                            ]}
                        >
                            Today
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => handleTabPress('scheduled')}
                        style={[styles.tab, selectedTab === 'scheduled' && styles.activeTab]}
                        >
                        <Icon
                            name="calendar-check"
                            size={24}
                            color={selectedTab === 'scheduled' ? '#fff' : '#666'}
                        />
                        <Text
                            style={[styles.tabText,
                            {
                                color: selectedTab === 'scheduled' ? '#fff' : '#666',
                                fontWeight: selectedTab === 'scheduled' ? 'bold' : 'normal'
                            }
                            ]}
                            >
                            Scheduled
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleTabPress('all')}
                        style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
                    >
                        <Icon
                            name="calendar-month-outline"
                            size={24}
                            color={selectedTab === 'all' ? '#fff' : '#666'}
                        />
                        <Text
                            style={[styles.tabText,
                            {
                                color: selectedTab === 'all' ? '#fff' : '#666',
                                fontWeight: selectedTab === 'all' ? 'bold' : 'normal'
                            }
                            ]}
                            >
                            All
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
    
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>My lists</Text>
                <FlatList
                    data={remindersToDisplay()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}                   
                    ListEmptyComponent={() => <Text style={styles.emptyText}>No reminder.</Text>}
                />
            </View>
    
            <TouchableOpacity style={styles.addReminderButton}>
                <Icon name="plus-circle" size={32} color="#fff" />
            </TouchableOpacity>       
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eddfe0',
        padding: 16,
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 10,
    },

    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 18,
        color: '#000',
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },

    tab: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 10,
    },

    activeTab: {
        backgroundColor: '#98ded9',
    },

    tabText: {
        color: '#fff',
        fontSize: 18,
    },

    activeTabText: {
        fontWeight: 'bold',
    },

    listContainer: {
        marginBottom: 48,
    },

    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },

    reminderItem: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },

    reminderTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },

    reminderDate: {
        fontSize: 16,
        fontWeight: '400',
        color: '#111',
    },

    reminderTime: {
        fontSize: 14,
        fontWeight: '400',
        color: '#111',
    },

    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
        marginTop: 20,
    },

    addReminderButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00C853',
        borderRadius: 50,
        padding: 16,
    },
});

export default Reminder;