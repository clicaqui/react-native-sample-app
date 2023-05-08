import * as Filesystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';

export const addPlace = (title:any, image:any, location:any) => {
    return async (dispatch:any) => {
        console.log(location);
        const  result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/ceilandia.json?proximity=${location.lat},${location.long}&limit=2&access_token=${ENV.mapDropoxKey}`);
     
        const respData = await result.json();
        console.log(respData);
        const address = respData.features[0].properties.address;
        const fileName = image.split('/').pop(); 
        const newPath = Filesystem.documentDirectory + fileName;

        try {
            Filesystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult:any = await insertPlace(title, newPath, address, location.lat, location.long);
            //console.log(db);
            dispatch( {type: ADD_PLACE, placeData: {id: dbResult.insertId, title: title, image: newPath, address: address, coords: {lat: location.lat, long: location.long}}});
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    
};

export const loadPlaces = () => {
    return async (dispatch:any) => {
        try {
            const dbResult:any = await fetchPlaces();
            console.log(dbResult);
            dispatch( {type: FETCH_PLACES, places: dbResult.rows._array});
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}