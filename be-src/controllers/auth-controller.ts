import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Auth } from "../models/auth";

export async function setEmailAndHash(email: string, password: string) {
  var hash = crypto.createHash("sha1").update(password, "utf-8").digest("hex");
  try {
    const [user, created] = await Auth.findOrCreate({
      where: { email, hash },
      defaults: {
        email,
        hash,
      },
    });
    if (!created) {
      console.log(created);
      console.log("este user esta registrado");
      return { messagge: "este user esta registrado" };
    } else {
      return { messagge: "Registrado con exito" };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getToken(password: string, email: string) {
  var hash = crypto.createHash("sha1").update(password, "utf-8").digest("hex");
  try {
    const auth = await Auth.findOne({ where: { hash, email } });
    if (auth === null) {
      return { messagge: "el usuario o contraseña no coincide" };
    } else {
      const token = jwt.sign(
        { hash, authid: auth.get("id") },
        process.env.SECRET_WORD
      );

      return token;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function updatePassword(newPassword: string, id: string) {
  var newHash = crypto
    .createHash("sha1")
    .update(newPassword, "utf-8")
    .digest("hex");
  try {
    const user = await Auth.findByPk(id);
    if (user) {
      user.update({ hash: newHash });

      return {messagge:"contraseña cambiada exitosamente"}
    } else {
      return { message: "no se pudo cambiar la contraseña" };
    }
  } catch (error) {
    console.log(error);
  }
}
