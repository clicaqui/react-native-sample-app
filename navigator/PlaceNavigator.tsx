import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import PlaceListScreen  from '../screens/PlaceListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import { navDetailOptions } from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';


const PlaceNavigator = () => {
    const PlaceStack = createStackNavigator();
    
    const defaultScreenOptions = {
        
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.secondColor : Colors.primaryColor
        }, headerTintColor: Platform.OS === 'android' ? Colors.primaryColor : Colors.secondColor
    };

        return (
            <NavigationContainer>
            <PlaceStack.Navigator             
                screenOptions={defaultScreenOptions}>
                    <PlaceStack.Screen name="ListPlace" component={PlaceListScreen} />
                    <PlaceStack.Screen name="NewPlace" component={NewPlaceScreen} />
                    <PlaceStack.Screen name="DetailPlace" component={PlaceDetailScreen} options={navDetailOptions}/>
                    <PlaceStack.Screen name="Map" component={MapScreen} />
            </PlaceStack.Navigator>

            </NavigationContainer>
        );

    
};
export default PlaceNavigator;