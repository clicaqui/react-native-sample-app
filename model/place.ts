class Place {
    id;
    title;
    imageUri;
    address;
    lat;
    long;
    constructor(id:any, title:string, image:string, address:string ,lat:any, long:any){
        this.id = id;
        this.title = title;
        this.imageUri = image;
        this.address = address
        this.lat = lat;
        this.long = long
    }
}
export default Place;