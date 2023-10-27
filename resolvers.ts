//@ts-ignore
import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "./models.ts";

//obtener todas las mascotas existentes
export const getMascotas = async (req: Request, res: Response) => {
    try{
        const allMascotas= await MascotaModel.find().exec(); // buscamos todas las mascotas sin filtros
        res.send(allMascotas);
    }catch (error){
        res.status(500).send(error.message);
    }
    return;
}

//buscar mascota mediante id
export const getMascotaByID = async (req: Request, res: Response) => {
    try{
        const mascota= await MascotaModel.findById(req.params.id).exec(); //buscamos la mascota por id
        res.send(mascota);
    }catch (error){
        res.status(404).send(error.message);
    }
}

//crear una nueva mascota
export const addMascota = async (req: Request, res: Response) => {
    if(!req.body.name || !req.body.type || !req.body.description){
        res.status(400).send("Bad request: missing name, type or description");
        return;
    }
    if(req.body.type!= "perro" && req.body.type!= "gato" && req.body.type!= "serpiente"){
        res.status(400).send("Bad request: type must be perro, gato or serpiente");
        return;
    }
    try{
        const mascota= new MascotaModel(req.body);
        const result= await mascota.save();
        res.send(result);
    }catch (error){
        res.status(404).send(error.message);
    }
}

//actualizar una mascota
export const updateMascota = async (req: Request, res: Response) => {
    try{
        const mascota= await MascotaModel.findByIdAndUpdate(req.params.id, req.body).exec();//buscamos disco por id y lo actualizamos
        res.send(mascota);
    }catch (error){
        res.status(404).send(error.message);
    }
}

//eliminar una mascota
export const deleteMascota = async (req: Request, res: Response) => {
    try{
        const mascota= await MascotaModel.findByIdAndDelete(req.params.id).exec();//buscamos disco por id y lo eliminamos
        res.send(mascota);
    }catch (error){
        res.status(404).send(error.message);
    }
}
