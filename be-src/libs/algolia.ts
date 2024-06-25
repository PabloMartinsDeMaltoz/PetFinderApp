import algoliasearch from "algoliasearch";
import "dotenv/config";
import { json } from "sequelize";
const client = algoliasearch(process.env.AAID, process.env.A_AKEY);

export async function addLostPet(id:number,lat:number,lng:number,name:string) {
  try {
    const reports = await client.initIndex("reports");
    const save = await reports.saveObject({
    //  objectID: id, //Este object ID tiene que crearse de manera random por que sino pisa el existente si una persona pierde dos mascotas 
      name,
      _geoloc: {
        lat: lat,
        lng: lng,
      }},{autoGenerateObjectIDIfNotExist: true})
  return save
}
   catch (error) {
    console.log(error);
    return error
  }
}

export async function arroundLoc (location){
  try {
    
    const reports = await client.initIndex("reports");
    const found= await reports.search('', {
      aroundLatLng: location
     ,aroundRadius: 10000 })
    return found.hits
  } catch (error) {
    console.log(error);
    return error
}}

