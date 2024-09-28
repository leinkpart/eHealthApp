import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
// @ts-ignore
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from "@react-navigation/native";


const DoneButtonComponent = ({...rest}) => {
    return (
        <TouchableOpacity {...rest} style={{
            marginHorizontal: 20,
            
        }}>
            <Text>Done</Text>
        </TouchableOpacity>
    )
}

const NextButtonComponent = ({...rest}) => {
    return (
        <TouchableOpacity {...rest} style={{
            marginHorizontal: 20,
            
        }}>
            <Text>Next</Text>
        </TouchableOpacity>
    )
}

const DotComponent = ({ selected }) => {
    return (
        <View style={{
            height: selected ? 10 : 8,
            width: selected ? 20 : 10,
            borderRadius: 20,
            marginHorizontal: 3,
            backgroundColor: selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
        }}/>
    )
}

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const onDone = () => {
        navigation.navigate("Login");
    };

    const onSkip = () => {
        navigation.navigate("Login");
    };

    
    return (
        <Onboarding
            onDone={onDone}
            onSkip={onSkip}
            DoneButtonComponent={DoneButtonComponent}
            NextButtonComponent={NextButtonComponent}
            DotComponent={DotComponent}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/onboarding1.png')} />,
                title: 'Health Care',
                subtitle: 'Please take care of your health',
                },

                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/onboarding2.png')} />,
                    title: 'Health Care',
                    subtitle: 'Take care of your Health help your Health being better',
                },

                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/onboarding3.png')} />,
                    title: 'Reading',
                    subtitle: 'Reading is also a way to help your Health',
                },
                
            ]}
        />
    )
}

export default OnboardingScreen