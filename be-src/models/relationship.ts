
import { Pets } from "./pets";
import { User } from "./user";


User.hasMany(Pets)
Pets.belongsTo(User)



export{Pets,User}