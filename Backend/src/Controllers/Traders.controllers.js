import Trader from "../Models/Trader.js";
import Response from "./Response.js";

export const getTraders = async (req, res) => {
  try {
    const trader = await Trader.find();
    const response = Response(trader, "Traders encontradas", "No hay Traders");
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const getTraderID = async (req, res) => {
  try {
    const id = req.params.id;
    const trader = await Trader.findById(id);
    const response = Response(trader, "Traders encontradas", "No hay Traders");
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const postTrader = async (req, res) => {
  try {
    const traders = new Trader(req.body);
    const newTraders = await traders.save();
    const response = Response(newTraders, "Trader guardadas", "Faltan Datos");
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(400).send({ error: "Faltan Datos" });
  }
};

export const putTrader = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const actualizacion = req.body;

    const updatedTrader = await Trader.findOneAndUpdate(id, actualizacion, {
      new: true,
    });

    const response = Response(
      updatedTrader,
      "Trader Actualizada exitosamente",
      "Trader no encontrados"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const deleteTrader = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const deletedTrader = await Trader.findOneAndDelete(id);

    const response = Response(
      deletedTrader,
      "Trader Eliminado exitosa",
      "Trader no encontrados"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};
