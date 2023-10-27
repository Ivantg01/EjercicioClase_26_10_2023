import mongoose from 'npm:mongoose@7.6.3';

const Schema = mongoose.Schema;


type Mascota = {
    name: string,
    description: string,
    type: string,
}

const mascotaSchema = new Schema(
    {
        name: String,
        description: String,
        type: String
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true } //createdAt, updatedAt
);

export type MascotaModelType = mongoose.Document & Omit<Mascota, "id">;

export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema);