import React, { useEffect } from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import  * as placesActions from '../store/place-actions';

export default function PlaceListScreen(props:any) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(placesActions.loadPlaces());
        props.navigation.setOptions({
            title: 'All Places',
            headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="New" iconSize={23} iconName={Platform.OS === 'android' ? 'md-camera' : 'ios-camera'}
            onPress={() => {
                props.navigation.navigate('NewPlace');
            }}/>
        </HeaderButtons> 
        });
    }, [dispatch]);
    const places = useSelector((state:any) => state.places.places  )
    
  return (
      <FlatList data={places}  keyExtractor={(item,index) => item.id} renderItem={itemData => 
      <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={itemData.item.address} 
          onSelect={() => {
            props.navigation.navigate('DetailPlace',{
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }} />} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
