//Practica 3A - Spin me like a record

//cargamos el fichero de entorno .env con la URI de la base de datos
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();
const DB_URI = env["DB_URI"] ||/* Deno.env.get("DB_URI") || */"mongodb://localhost:27017/mascotas" //3000
//const DB_URI="mongodb+srv://userdb:pass4userdb@cluster0.m7bq9ap.mongodb.net/?retryWrites=true&w=majority"

//conexion con la base de datos
//import mongoose from "npm:mongoose@^6.7";
import mongoose from "npm:mongoose@7.6.3";
try {
  console.log("Database: connecting... ", DB_URI);
  const db = await mongoose.connect(DB_URI);
  console.log("Database: connected", db.connection.name);
} catch (error) {
  console.log("Database: error: ", error);
}


//inicialiamos aplicacion web
import express, { Request, Response } from "npm:express@4.18.2";
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
    .get("/mascotas/", getMascotas)

    //-Obtener un disco mediante id
    .get("/mascotas/:id/", getMascotaByID)
    //Llamadas POST ->
    //-Crear nueva mascota
    .post("/mascotas", addMascota)
    //Llamadas PUT ->
    //-Actualizar una mascota existente indicándolo por su id
    .put("/mascotas/:id",updateMascota)
    //Llamadas DELETE ->
    //-Eliminar una mascota mediante su id
    .delete("/mascotas/:id", deleteMascota);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});