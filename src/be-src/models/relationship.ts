
import { Pets } from "./pets";
import { User } from "./user";
import { Auth } from "./auth";



User.hasMany(Pets)
Pets.belongsTo(User)



export{Pets,User}