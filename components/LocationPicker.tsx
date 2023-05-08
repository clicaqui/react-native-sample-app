import React, { useEffect, useState, useCallback } from 'react';
import { View , Text, Button , StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';


const LocationPicker = (props:any) => {    
    const [pickedLocation, setPickedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    let mapPickedLocation:any;
    if(props.route.params!= undefined){
        mapPickedLocation =props.route.params.pickedLocation;
    }
    
    useEffect(() => {
        if (mapPickedLocation) {
          setPickedLocation(mapPickedLocation);
          props.onLocationPicked(mapPickedLocation);
        }
      }, [mapPickedLocation]);

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient  permissiont','You need permissions', [{text: 'Ok'}]);
            return false;
        }
        return true;
    }   
    const getPickedHandler = () => {
        props.navigation.navigate('Map');
    };
    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermission();
        if (!hasPermissions){
            return;
        }
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeInterval: 5000
            });
            setPickedLocation({ 
            lat: location.coords.latitude,
            long: location.coords.longitude
            });
            props.onLocationPicked({
                lat: location.coords.latitude,
                long: location.coords.longitude
              });
        } catch (error) {
            Alert.alert('Dont have access','Location denied', [{text: 'Okay'}]);
        }
        setIsFetching(false);
    };
    return (
        <View style={styles.locationPicker}>        
        <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={getPickedHandler}> 
        {isFetching ? (<ActivityIndicator size='large' color={Colors.primaryColor}/>) : ( <Text>
             No location yeath chosen!!
         </Text>)}
        </MapPreview>
        <View style={styles.actions}>
            <Button title="Get Location" onPress={getLocationHandler}/>
            <Button title="Get on Map" onPress={getPickedHandler}/>
        </View>
        </View>
    );

};
 const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview:{
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    }
});
export default LocationPicker;