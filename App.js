import * as React from 'react';
import { View, Text, TouchableOpacity, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Onboard from './src/screens/Onboarding';
import Login from './src/screens/LoginScreen';
import Setting from './src/screens/SettingsScreen';
import Reminder from './src/screens/remindFolder/Reminder';
import Home from './src/screens/homeFolder/Home';
import Community from './src/screens/homeFolder/Community';
import Notify from './src/screens/homeFolder/Notification';
import AddReminder from './src/screens/remindFolder/AddReminder';
import Repeat from './src/screens/remindFolder/RepeatAction';
import Walking from './src/screens/homeFolder/WalkingScreen';
import Fitness from './src/screens/homeFolder/Fitness';
import FitnessVideo from './src/screens/homeFolder/FitnessVideo';

import Icon from 'react-native-vector-icons/Ionicons';
import IconEmoji from 'react-native-vector-icons/Entypo'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          backgroundColor: '#fff',
          borderRadius: 20,
          height: 80,
          elevation: 10,
          width: '99%'
        },

        tabBarLabelStyle: {
          fontSize: 15, 
          marginBottom: 8, 
          fontWeight: '900'
        },

        tabBarIconStyle: {
          marginBottom: -10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={35} color={focused ? '#4F75FF' : '#697565'} />
          ),
        }}
      />

      <Tab.Screen 
        name="Fitness" 
        component={Fitness} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="fitness" size={40} color={focused ? '#4F75FF' : '#697565'} />
          ),
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={Notify} 
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <IconEmoji name="emoji-flirt" size={45} color="#fff" />
            </CustomTabBarButton>
          )
        }}
      />
      <Tab.Screen 
        name="Community" 
        component={Community} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="reader" size={35} color={focused ? '#4F75FF' : '#697565'} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Setting} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="settings-sharp" size={35} color={focused ? '#4F75FF' : '#697565'} />
          ),
          
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);

  React.useEffect(() => {
    // When the app loads fisrt
    // async storage 
    // await AsyncStorage.setItem('isFirstLaunch', true)
  })
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          <Stack.Screen name="Onboarding" component={Onboard} 
            options={{
              headerShown: false,
            }}
          />
        }
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Walking" component={Walking}
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen name="Reminder" component={Reminder} 
          options={{
            title: 'Reminder',
            headerShown: true,
            headerTintColor: '#00C853', 
            headerTitleStyle: {
              color: '#000', 
            },
          }}
        />

        <Stack.Screen 
          name="AddReminder" 
          component={AddReminder} 
          options={{ 
            title: 'New reminder',
            //presentation: 'modal', 
            headerShown: false,    // Hide header for modal
          }} 
        />

        <Stack.Screen 
          name="Repeat" 
          component={Repeat} 
          options={{ 
            title: 'Repeat',
            presentation: 'modal', 
            headerShown: false,    // Hide header for modal
          }} 
        />

        <Stack.Screen name="HomeScreen" component={TabNavigator} 
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Notify" component={Notify} 
          options={{
            headerShown: true,
            title: 'Notify',
          }}
        />

        <Stack.Screen name="Video" component={FitnessVideo} 
          options={{
            headerShown: true,
            title: 'Watch video',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View style={styles.plusButton}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = {
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#15B392',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;