import { NUMBER } from "sequelize";
import { User } from "../models/relationship";

export async function setUser(
  fullname: string,
  tel: number,
  authid: number,
  city: string
) {if(authid){

  try {
    const [user, created] = await User.findOrCreate({
      where: { authid },
      defaults: {
        fullname,
        tel,
        authid,
        city,
      },
    });

    if (!created) {
      const updateData = await user.update({ fullname, tel, city });
      console.log(updateData);
      return updateData;
    } else {
      return user;
    }
  } catch (err) {
    console.log(err);
  }
}else {
  console.log("falta auht id");
  
}

}

export async function getUser(id: number) {
  try {
    const user = await User.findByPk(id);
    if (user === null) {
      console.log("Not found!");
    } else {
      console.log(user instanceof User); // true
      return user;
    }
  } catch (error) {}
}

export async function updateUser(
  id: string,
  newfullname: string,
  newtel: number,
  newcity: string
) {
  const dataUser = await User.findByPk(id);
  
  if (dataUser) {
    const newDataUser = await dataUser.update({
      fullname: newfullname,
      tel: newtel,
      city: newcity,
    });
    console.log(newDataUser);
    return newDataUser;
  } else {
    return { messagge: "no se encontro ese user" };
  }
}
