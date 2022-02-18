import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/screens/Home';
import Camera from '../components/screens/Camera';
import Bluetooth from '../components/screens/Bluetooth';
import {Icons} from 'react-native-fontawesome';

const Stack = createNativeStackNavigator();


export default function Navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{headerStyle: {
                    backgroundColor: '#e5e4df'
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'normal',
                },
                }}
                >
                <Stack.Screen 
                    name='Home' 
                    component={Home}
                    options={{title: 'Native App'}}
                />
                <Stack.Screen name='Camera' component={Camera}/>
                <Stack.Screen name='Bluetooth' component={Bluetooth}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}