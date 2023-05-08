import { ADD_PLACE, FETCH_PLACES } from './place-actions';
import Place from '../model/place';
const initialState = {
    places: []
};

export default (state = initialState, action:any) => {
    switch (action.type){
        case FETCH_PLACES:
            return {
                places: action.places.map((pl:any) => new Place(pl.id, pl.title, pl.imageUri, pl.address, pl.lat, pl.long))
            };
        case ADD_PLACE:
            const newPlace:any = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image, action.placeData.address, action.placeData.coords.lat, action.placeData.coords.long);
            return {
                places: state.places.concat(newPlace)
            };

        default:
            return state;
    }
}