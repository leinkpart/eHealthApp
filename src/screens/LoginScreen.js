import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'
import { ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <ImageBackground
            source={require("../assets/background.jpg")}
            style={styles.backGround}
            resizeMode="cover"
            >
            <View style={styles.overlay} />

            <View style={styles.container}>
                {/* Tab Section */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, isSignIn && styles.activeTab]}
                        onPress={() => setIsSignIn(true)}
                    >
                        <Text style={[styles.tabText, isSignIn && styles.activeTabText]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, !isSignIn && styles.activeTab]}
                        onPress={() => setIsSignIn(false)}
                    >
                        <Text style={[styles.tabText, !isSignIn && styles.activeTabText]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {isSignIn ? <SignInComponent /> : <SignUpComponent />}
            </View>
        </ImageBackground>
    );
};

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigation = useNavigation();

    const handleSignIn = async () => {
        if (!email) {
            setError('Please enter your email');
            return;
        }

        if (!password) {
            setError('Please enter your password');
            return;
        }

        try {
            // Đăng nhập người dùng
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const newUserToken = userCredential.user.uid;
            
            // Lưu token vào AsyncStorage
            await AsyncStorage.setItem('userToken', newUserToken);
            console.log("User token saved to AsyncStorage:", newUserToken);
            
            // Chuyển hướng đến trang Home sau khi đăng nhập thành công
            navigation.navigate('HomeScreen');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('Email is incorrect, try again!');
            } else if (error.code === 'auth/wrong-password') {
                setError('Password is incorrect, try again!');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email format, try again!');
            } else {
                setError('Login failed, try again later!');
            }
        }
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="example@mail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}  // Toggle secureTextEntry based on passwordVisible state
                value={password}
                onChangeText={setPassword}
                />

                <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)}  // Toggle password visibility
                    >
                    <Icon name={passwordVisible ? "eye" : "eye-off"} size={26} color="#fff" /> 
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Hiển thị lỗi nếu có */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
            <TouchableOpacity style={styles.signInButton}onPress={handleSignIn} >
                <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.separator}>
                <View style={styles.line}/>
                    <Text style={styles.textLine}>Or</Text>
                <View style={styles.line}/>
            </View>

            <View style={styles.signInWith}>
                {/* Nút đăng nhập bằng Google */}
                <TouchableOpacity style={styles.googleButton}>
                    <Icon name="logo-google" size={24} color='#fff' style={{ paddingRight: 5 }} />
                    <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>

                {/* Nút đăng nhập bằng Facebook */}
                <TouchableOpacity style={styles.facebookButton} >
                    <Icon name="logo-facebook" size={24} color='#fff' style={{ paddingRight: 5 }} />
                    <Text style={styles.buttonText}>Facebook</Text>
                </TouchableOpacity>
            </View>

            {/* Nút đăng nhập bằng số điện thoại */}
            <TouchableOpacity style={styles.phoneButton}>
                <IconFont name="phone" size={24} color='#fff' style={{ paddingRight: 5 }}/>
                <Text style={styles.buttonText}>Phone Number</Text>
            </TouchableOpacity>
        </View>      
    );
};

const SignUpComponent = () => {
    const [username, setUsername] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignUp = async () => {
        if (password !== repeatPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!username || !email || !password) {
            setError('Please fill all fields');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long!');
            return;
        }

        try {
            setLoading(true);

            // Đăng ký người dùng mới
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid; // Lấy uid của người dùng

            // Lưu thông tin người dùng vào Realtime Database
            await firestore().collection('users').doc(userId).set({
                username: username,
                email: email,
                password: password,
                avatar: null, 
                createdAt: new Date().toISOString(),
                walkingData: {
                    steps: 0,
                    percentage: 0,
                    calories: 0,
                    distance: 0,
                    duration: 0,
                    weeklyData: [0, 0, 0, 0, 0, 0, 0],
                },
            });

            Alert.alert('Notification', 'Seccessful Signed Up.')

            console.log("User sign up successfully!");

            // Chuyển hướng đến màn hình chính sau khi đăng ký thành công
            navigation.navigate('HomeScreen');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Dừng loading sau khi hoàn thành
        }
    };

    return (
        <View>
            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput 
                style={styles.input} 
                placeholder="example@mail.com" 
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}  // Toggle secureTextEntry based on passwordVisible state
                value={password}
                onChangeText={setPassword}
                />
                <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}  // Toggle password visibility
                >
                <Icon 
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}  // Toggle icon
                    size={26} 
                    color="#fff"
                />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput 
                style={styles.input} 
                placeholder="Repeat Password" 
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}  // Toggle secureTextEntry based on passwordVisible state
                value={repeatPassword}
                onChangeText={setRepeatPassword}  // Update repeatPassword state
                />
                <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}  // Toggle password visibility
                >
                <Icon 
                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}  // Toggle icon
                    size={26} 
                    color="#fff"
                />
                </TouchableOpacity>

                {/* Display error message if passwords don't match */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignUp} disabled={loading} >
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>SIGN UP</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backGround: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    absolute: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    container: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        marginBottom: 110,
    },
        
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    tabButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },

    activeTab: {
        borderBottomColor: '#00C853',
    },

    tabText: {
        color: '#fff',
        fontSize: 16,
    },

    activeTabText: {
        color: '#00C853',
        fontWeight: 'bold',
    },

    input: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        padding: 15,
        color: '#fff',
        marginBottom: 15,
        fontSize: 18,
        paddingRight: 45
    },

    signInButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#00C853',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    passwordContainer: {
        position: 'relative',
        width: '100%',
    },

    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    
    forgotText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'right',
        marginTop: -10,
        marginBottom: 10,
    },
    
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },

    separator: {
        flexDirection: 'row',
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    line: {
        height: 1,
        width: 100,
        backgroundColor: '#fff'
    },
    
    textLine: {
        color: '#fff',
        paddingRight: 10,
        paddingLeft: 10,
    },
    
    signInWith: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,
    },
    
    googleButton: {
        flexDirection: 'row',
        width: '40%',
        //padding: 15,
        backgroundColor: '#4285F4',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        height: 40,
    },
    
    facebookButton: {
        flexDirection: 'row', 
        width: '40%',
        //padding: 15,
        backgroundColor: '#4267B2',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        height: 40,
    },
    
    phoneButton: {
        flexDirection: 'row',
        width: '70%',
        //padding: 15,
        backgroundColor: '#00C853',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginLeft: '15%',
        height: 40,
    },
});

export default SignIn;
