import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';


const PlaceItem = (props:any) => {
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
            <Image style={styles.image} source={{uri: props.image }}/>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
        );
};
const styles = StyleSheet.create({
    placeItem:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical:15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
       // backgroundColor: 'blue',
        borderColor: Colors.primaryColor,
        borderWidth: 1
    },
    infoContainer:{
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 15
    },
    address: {
        color: '#666',
        fontSize: 16
    }
    });
export default PlaceItem;