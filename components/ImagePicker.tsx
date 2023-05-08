import React, { useState } from 'react';
import { View , Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CustomImagePicker = (props:any) =>{
    const [pickedImage, setPickedImaged] = useState({});
    const [isImagePicked, setIsImagePicked] = useState(false);
    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status !== 'granted'){
            Alert.alert('Insuficient  permissiont','You need permissions', [{text: 'Ok'}]);
            return false;
        }
        return true;
    }   
    const takeImageHandler = async () =>{
        const hasPermitions = await verifyPermission();
        if (!hasPermitions){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        setPickedImaged(image);
        setIsImagePicked(true);
        props.onImageTaken(image);
    };
    return(
        <View style={styles.imagePicked}>
            <View style={styles.imagePreview}>
                {!isImagePicked ? ( <Text>NO image picked</Text> )
                : ( <Image source={pickedImage} style={styles.image}/> )}
            </View>
            <Button title="Take a Shot" onPress={takeImageHandler}/>
        </View>
    );
};
const styles = StyleSheet.create({
    imagePicked: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderColor: '#ccc',
        borderWidth: 1       
    },
    image:{
        width: '100%',
        height: '100%'
    }
});
export default CustomImagePicker;