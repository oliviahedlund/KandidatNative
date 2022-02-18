import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import Camera from '../screens/CameraScreen';
import Bluetooth from '../screens/BluetoothScreen';

const Stack = createNativeStackNavigator();


export default function Navigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{headerStyle: {
                    backgroundColor: '#803332'
                },
                headerTintColor: '#ffff',
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