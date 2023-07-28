import mongoose from "mongoose";

const dineroSchema = mongoose.Schema(
  {
    criptomonedas: {
      type: String,
      required: true,
      trim: true,
    },
    fiat: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timmestamps: true,
  }
);

const Dinero = mongoose.model("dinero", dineroSchema);

export default Dinero;
