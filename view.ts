import express from "express";
import cors from "cors";
import { sequelize } from "./be-src/index";
import {
  setUser,
  getUser,
  updateUser,
} from "./be-src/controllers/user-controller";
import {
  getToken,
  setEmailAndHash,
  updatePassword,
} from "./be-src/controllers/auth-controller";
import { authMiddleware } from "./be-src/utils/authmidleware";
import bodyParser from "body-parser";
import path from "node:path";
import { addReport, editLostPet, getLostPet, } from "./be-src/controllers/pets-controller";
import { arroundLoc } from "./be-src/libs/algolia";

//sequelize.sync({ force: true });
const app = express();
const port = 3000;
const ruta = path.resolve(__dirname + "/fe-src");
console.log(ruta);

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

/*
app.get("/", async (req, res) => {
  res.send("Hello World!");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
*/
//Este endpoint da de alta el email en la base de datos y crea un hash
app.post("/auth", async (req, res) => {
  const { password, email } = req.body;
  const auth = await setEmailAndHash(email, password);
  res.status(200).json({ auth });
});

app.post("/auth/token", async (req, res) => {
  const { password, email } = req.body;
  const token = await getToken(password, email);
  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(400).json({ token });
  }
});
app.patch("/auth/update", authMiddleware, async (req: any, res) => {
  const { password } = req.body;
  const update = await updatePassword(password, req._user.authid);
  res.status(200).json({ update });
});

app.post("/user", authMiddleware, async (req: any, res) => {
  const { fullname, tel,  city } = req.body;
  const token = req._user;
  const user = await setUser(fullname, tel, token.authid, city);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ user });
  }
});

app.get("/user", authMiddleware, async (req: any, res) => {
  const id = req._user.authid;
  

  const user = await getUser(id);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ user });
  }
});

app.patch("/user/update",authMiddleware, async (req: any, res) => {
  const id = req._user.authid;
 
  
  const { fullname, city, tel } = req.body;
  const user = await updateUser(id, fullname, tel, city);
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(400).json({ user });
  }
});

app.post("/pet", authMiddleware, async (req: any, res) => {
  const { name,lat,lng,picture } = req.body;
  const userId = req._user.authid;
  const report = await addReport(userId,name,lat,lng,picture)
  if(report){
    console.log(report);
    res.json({messagge:report})
  }  else{
    res.json({messagge:report})
  }
});
app.patch("/pet", authMiddleware, async (req: any, res) => {
  const { name,lat,lng,picture,public_id,petId } = req.body;
  const userId = req._user.authid;
  const report = await editLostPet (userId,name,lat,lng,picture,public_id,petId)
  if(report){
    console.log(report);
    res.json({messagge:report})
  }  else{
    res.json({messagge:report})
  }
});
app.get("/pet/lost",authMiddleware, async(req:any,res)=>{
  const id = req._user.authid;
  const pets = await getLostPet(id)
  res.json({pets})
})


/*
app.get("/pet",authMiddleware,async(req,res)=>{
const location =[req.query.lat,req.query.lng].join(",")
const found= await arroundLoc(location)
console.log(found);

res.json({location,found})

})
*/
app.listen(port, () => {
  console.log(`Example app listening on ports ${port}`);
});

app.use(express.static(ruta));

app.get("*", (req, res) => {
  console.log(ruta );

  res.sendFile(ruta);
});
