import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import PostComponent from '../../component/PostCommunity';
//import { v4 as uuidv4 } from 'uuid';


const users = [
    {
        id: 1,
        name: "Jessica Mendez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc9998c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1534528740890-4b3b388279f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Jane Doe",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Jane Doe",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 5,
        name: "Jane Doe",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 6,
        name: "Peter",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 7,
        name: "Maria",
        avatar: "https://images.unsplash.com/photo-1534528740890-4b3b388279f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    }
];

export default function Community() {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const renderUser = ({ item }) => (
        <TouchableOpacity
            style={styles.userContainer}
            onPress={() => handleUserSelect(item)}
            >
            <Image
                source={{ uri: item.avatar }}
                style={styles.userAvatar}
            />
            <Text style={styles.userName}>{item.name}</Text>
       </TouchableOpacity>
    );

    const posts = [
        {
            //id: uuidv4(),
            userName: 'Jessica Mendez',
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc9998c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            time: '10m ago',
            text: 'A Delicious breakfast on weekend #brekkie',
            images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg'],
            likes: 45,
            comments: 4,
        },

        {
            //id: uuidv4(),
            userName: 'John Doe',
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            time: '1h ago',
            text: 'Just had a great workout! #fitness',
            images: ['https://example.com/image4.jpg', 'https://example.com/image5.jpg'],
            likes: 23,
            comments: 2,
        },

        {
            //id: uuidv4(),
            userName: 'Jane Doe',
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFuJTIwd2l0aCUyMGJlYXJkJTIwYW5kJTIwd29tYW4lMjBzaGFkb3dzfGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            time: '2h ago',
            text: 'Just had a great day at the beach! #beachlife',
            images: ['https://example.com/image6.jpg', 'https://example.com/image7.jpg', 'https://example.com/image8.jpg'],
            likes: 56,
            comments: 6,
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.addPostButton}>
                        <Text style={styles.addPostButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.usersContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {users.map((user) => (
                            <TouchableOpacity
                            key={user.id}
                            style={styles.userContainer}
                            onPress={() => handleUserSelect(user)}
                            >
                            <Image
                                source={{ uri: user.avatar }}
                                style={styles.userAvatar}
                            />
                            <Text style={styles.userName}>{user.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {posts.map((post, index) => (
                    <PostComponent key={index} post={post} />
                ))}
            </ScrollView>

            <View style={{height: 85, backgroundColor: '#eddfe0', borderRadius: 20}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eddfe0',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    addPostButton: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    addPostButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    usersContainer: {
        paddingHorizontal: 10,
        margin: 10,
        backgroundColor: '#fff',
        paddingTop: 15,
        borderRadius: 15,
        marginTop: -10,
    },

    userContainer: {
        alignItems: 'center',
        marginRight: 15,
    },

    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    
    userName: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
});
