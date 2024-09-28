import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFont from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';



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
                
            <TouchableOpacity style={styles.signInButton}onPress={() => navigation.navigate('Home')} >
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
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    return (
        <View>
            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                placeholderTextColor="#999"
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

            <TouchableOpacity style={styles.signInButton} >
                <Text style={styles.buttonText}>SIGN UP</Text>
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
