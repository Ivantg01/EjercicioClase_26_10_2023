//Practica 3A - Spin me like a record

import express, { Request, Response } from "npm:express@4.18.2";

//cargamos el fichero de entorno .env con la URI de la base de datos
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();

//const DB_URI = env["DB_URI"] || Deno.env.get("DB_URI") || "mongodb://localhost:27017/mascotas"
const DB_URI=env.DB_URI

//conexion con la base de datos
//import mongoose from "npm:mongoose@^6.7";
import mongoose from "npm:mongoose@7.6.3";
try {
  console.log("Database: connecting... ", DB_URI);
  await mongoose.connect(DB_URI);
  console.log("Database: connected");
} catch (error) {
  console.log("Database: error: ", error);
}


//inicialiamos aplicacion web

const app = express();
app.use(express.json());  //habilitamos el uso de json

//importamos las funciones llamadas por cada peticion get, post, put y delete
import { getMascotas, getMascotaByID, addMascota, updateMascota, deleteMascota } from "./resolvers.ts";
//registramos en express las llamadas web
app
    //Llamadas GET ->
    .get("/", (req: Request, res: Response) => {
      res.status(200).send("API para manejar mascotas!");
    })
    //-Obtener todos los discos existentes
    .get("/api/mascotas/", getMascotas)

    //-Obtener un disco mediante id
    .get("/api/mascotas/:id/", getMascotaByID)
    //Llamadas POST ->
    //-Crear nueva mascota
    .post("/api/mascotas", addMascota)
    //Llamadas PUT ->
    //-Actualizar una mascota existente indicándolo por su id
    .put("/api/mascotas/:id",updateMascota)
    //Llamadas DELETE ->
    //-Eliminar una mascota mediante su id
    .delete("/api/mascotas/:id", deleteMascota);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});