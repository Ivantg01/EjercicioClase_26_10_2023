import mongoose from 'npm:mongoose@7.6.3';

const Schema = mongoose.Schema;

type Disc = {
    name: string,
    description: string,
    type: string
}

const mascotaSchema = new Schema(
    {
        name: String,
        description: String,
        type: String,
        //no incluimos id ya que mongoDB crea un campo _id automaticamente
    },
    { timestamps: true }
);

export type MascotaModelType = mongoose.Document & Omit<Disc, "id">;

export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema);