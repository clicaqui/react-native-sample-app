import React from 'react';
import { View , Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ENV from '../env';

const MapPreview = (props:any) => {

    let imagePreviewUrl;
    if(props.location){
         imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/
        ${props.location.long},${props.location.lat},9.67,0.00,0.00/400x200@2x?access_token=${ENV.mapDropoxKey}`;
    }
    
    return (  
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}>
            {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl }}/> : props.children }
        </TouchableOpacity>
          );

}
const styles = StyleSheet.create({
    mapPreview:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});
export default MapPreview;