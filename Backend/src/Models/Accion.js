import mongoose from "mongoose";

const accionesSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timmestamps: true,
  }
);

const Acciones = mongoose.model("accione", accionesSchema);

export default Acciones;
