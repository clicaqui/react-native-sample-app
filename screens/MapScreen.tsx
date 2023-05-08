import React, {useState} from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const MapScreen = (props:any) => {
  const [selectedLocation, setSelectedLocation] = useState();
    const mapRegion = {
        latitude: selectedLocation ? selectedLocation.lat : -15.867912,
        longitude: selectedLocation ? selectedLocation.long : -48.057476,
        latitudeDelta: 0.0098,
        longitudeDelta: 0.00241
    }
    const selectLocationHandler = (event:any) => {
      setSelectedLocation({
        lat: event.nativeEvent.coordinate.latitude,
        long: event.nativeEvent.coordinate.longitude
      });
    }
    let markerCoordinates = {};
    if (selectedLocation){
      markerCoordinates = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.long
      }
    }

    const onSaveHandler = () => {
      if (Object.keys(selectedLocation).length === 0){        
        return;
      }
      props.navigation.navigate('NewPlace',{ pickedLocation: selectedLocation});
    }
    React.useLayoutEffect(() => { 
      props.navigation.setOptions({
          title: 'Save',
          headerRight: () => <TouchableOpacity onPress={onSaveHandler} style={styles.headerButton}>
                              <Text style={styles.headerButtonText}>Save</Text>
                              </TouchableOpacity>  
      });
  });
    return (

        <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
          {selectedLocation && <Marker title="Picked Location" coordinate={markerCoordinates} />}
        </MapView>
    );
};
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginBottom: 8,
    marginRight: 10
  },
  headerButtonText:{
    fontSize: 16,
    color: Platform.OS === 'android' ? Colors.primaryColor : Colors.secondColor,
    paddingLeft: 20
  }
});
export default MapScreen;
