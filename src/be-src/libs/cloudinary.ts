import {v2 as cloudinary }from 'cloudinary';
import "dotenv/config";


cloudinary.config({ cloud_name: process.env.C_N, 
  api_key: process.env.C_AK, 
  api_secret: process.env.C_AS })

 export async function uploadPhoto (imagePath:string){
     {
          // Use the uploaded file's name as the asset's public ID and 
          // allow overwriting the asset with new versions
          const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          };
   
          try {
            // Upload the image
            const result = await cloudinary.uploader.upload(imagePath, options);
            console.log(result);
            return result.public_id;
          } catch (error) {
            console.error(error);
          }
      };
      
  }
  export async function deletePhoto(id:string,version:string) {
  /*  cloudinary.v2.api
  .delete_resources(['hyqtravpgzlvnynfzfrs', 'n3rqmluseydgk7axgics'], 
    { type: 'upload', resource_type: 'image' })
  .then(console.log);*/
    cloudinary.api.delete_derived_resources([id,version])
  }
  
 export async function getPhoto (public_id:string){
          const options = {
            colors: true,
          };
      
          try {
              // Get details about the asset
              const result = await cloudinary.api.resource(public_id, options);
              console.log(result);
              return result.url;
              } catch (error) {
              console.error(error);
          }
      }


  export async function updatePhoto(img:string,public_id:string){
 //   const path = 'ruta/a/tu/nueva/imagen.jpg'; // Ruta a la nueva imagen
  //  const publicId = 'public_id_existente'; // El public_id de la imagen que quieres reemplazar

 const result = await cloudinary.uploader.upload(img, { public_id, overwrite: true }, (error, result) => {
  if (error) {
    console.error('Error al subir la nueva versión de la imagen:', error);
  } else {
    console.log('Imagen actualizada con éxito:', result);
  }
});
return result.public_id;
  }    
  