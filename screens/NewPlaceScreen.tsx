import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import CustomImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';
import * as placeActions from '../store/place-actions';


export default function NewPlaceScreen(props:any) {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [savedLocation, setSavedLocation] = useState();

  const onTextChange = (text:string) => {
    setTitleValue(text);
  };
  const dispatch = useDispatch();

  const onTakenImage = (image:any) => {
    setSelectedImage(image.uri)
  }
  const onSavePlaceHandler =() => {
      dispatch(placeActions.addPlace(titleValue, selectedImage, savedLocation));
      props.navigation.goBack();
  };
  const getPickedLocationHandler = (location:any) => {
      setSavedLocation(location);
  };
  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.label}>Open up App.tsx to start working on your app!</Text>
      <TextInput style={styles.textInput} onChangeText={onTextChange} value={titleValue}/>
      <CustomImagePicker onImageTaken={onTakenImage}/>
      <LocationPicker onLocationPicked={getPickedLocationHandler} navigation={props.navigation} route={props.route}/>
      <Button title="Save Place" color={Colors.primaryColor} onPress={onSavePlaceHandler}/>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   margin: 30
  },
  label:{
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});
