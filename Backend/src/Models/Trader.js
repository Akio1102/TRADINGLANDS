import mongoose from "mongoose";

const traderSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    edad: {
      type: Number,
      required: true,
      trim: true,
    },
    nacionalidad: {
      type: String,
      required: true,
      trim: true,
    },
    presupuesto: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timmestamps: true,
  }
);

const Trader = mongoose.model("trader", traderSchema);

export default Trader;
