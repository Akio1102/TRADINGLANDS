import Dinero from "../Models/Dinero.js";
import Response from "./Response.js";

export const getDineros = async (req, res) => {
  try {
    const dinero = await Dinero.find();
    const response = Response(dinero, "Dineros encontrados", "No hay Dineros");
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const getDineroID = async (req, res) => {
  try {
    const id = req.params.id;
    const dinero = await Dinero.findById(id);
    const response = Response(
      dinero,
      "Dinero encontradas",
      "Dinero no encontradas"
    );
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const postDineros = async (req, res) => {
  try {
    const dineros = new Dinero(req.body);
    const newDineros = await dineros.save();
    const response = Response(newDineros, "Dinero guardado", "Faltan Datos");
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(400).send({ error: "Faltan Datos" });
  }
};

export const putDineros = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const actualizacion = req.body;

    const updatedDinero = await Dinero.findOneAndUpdate(id, actualizacion, {
      new: true,
    });

    const response = Response(
      updatedDinero,
      "Dinero Actualizado exitosamente",
      "Dinero no encontrado"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const deleteDineros = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const deletedDinero = await Dinero.findOneAndDelete(id);

    const response = Response(
      deletedDinero,
      "Dinero Eliminado exitosa",
      "Dinero no encontrados"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};
