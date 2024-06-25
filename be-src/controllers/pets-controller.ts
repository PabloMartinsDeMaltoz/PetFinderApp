import { getPhoto,uploadPhoto,updatePhoto } from "../libs/cloudinary";
import { Pets } from "../models/relationship";
import { addLostPet } from "../libs/algolia";

type estado = "perdido"|"encontrado"

//Proximo paso establecer la tabla Pets con los datos para poder reportar la mascota perdida, ademas la foto tenemos que guardarla en la base de datos de claudinary.
//La persona que llega a esta instancia tiene que estar registrada para poder ingresar una mascota perdida. A si que podemos verificar y autenticar antes de seguir de no ser asi tendra que registrarse.
//-58.599566 -34.636109 Direccion Puan 976 Haedo para probar.

export async function addReport(id:number,name:string,last_location_lat:number,last_location_lng:number, picture:string) {
    try {
        const petSearch =await Pets.findAll({where:{UserId:id,name}})
        if(petSearch.length >= 1){
          console.log(petSearch, "FOUND IT");
          return {messagge:"Esta mascota ya esta registrada"}
        }else{
          
          const addAlgolia= await addLostPet(id,last_location_lat,last_location_lng,name)
          const addCloudinary= await uploadPhoto(picture)
          const [user, created] = await Pets.findOrCreate({
              where: { UserId:id, name },
              defaults: {
                  name,
                  last_location_lat,
                  last_location_lng,
                  estados:"perdido",
                  UserId:id,
                  picture:addCloudinary,
              }
          })
          return {user}
        }
    } catch (error) {
        return error
    } 
} 

// Aca tenemos que obtener las mascotas perdidas de un usuario en particular , asi que vamos a tener un ID de usuario en la tabla Pets y viceversa.
export async function getLostPet( id:string) {
  const lostPet =await Pets.findAll({ where: { UserId: id } });
  if (lostPet === null) {
    console.log('Not found!');
  } else {
    console.log(lostPet instanceof Pets); // true
   // console.log(lostPet.UserId); // 'My Title'
  }
  console.log(lostPet)
  return lostPet 
}
// Aca tenemos que asegurarnos de recibir el id de la mascota a editar , foto o datos de la misma
export async function editLostPet(id:number,name:string,last_location_lat:number,last_location_lng:number, picture:string,public_id:string,petId) {
  //modificar la foto existente
  const newPicture= await updatePhoto(picture,public_id)
  const [user, created] = await Pets.findOrCreate({
    where: { UserId:id , id:petId },
    defaults: {
        name,
        last_location_lat,
        last_location_lng,
        picture:newPicture
    }
})
if(!created){
  console.log(created,"aca tenes que poner los cambios capo");
  const newUser= await user.update({ name,
    last_location_lat,
    last_location_lng,
    picture:newPicture},{where:{id:petId}})
  return newUser
}
return created
}
//Emprolijar las funciones de MAPBOX pasarlas a libs y de ahi sacar las funciones que necesitamos , sean las de AroundLatLnG , o setMarkInMap