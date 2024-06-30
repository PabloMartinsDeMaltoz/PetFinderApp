import * as jwt from "jsonwebtoken"
import "dotenv/config";

export function authMiddleware(req:any, res:any, next:any) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const hash = jwt.verify(token, process.env.SECRET_WORD) as any;
    req._user = hash;
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(401);
  }
}
