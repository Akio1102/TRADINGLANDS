import Acciones from "../Models/Accion.js";
import Response from "./Response.js";

export const getAcciones = async (req, res) => {
  try {
    const acciones = await Acciones.find();
    const response = Response(
      acciones,
      "Acciones encontradas",
      "No hay Acciones"
    );
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const getAccionID = async (req, res) => {
  try {
    const id = req.params.id;
    const acciones = await Acciones.findById(id);
    const response = Response(
      acciones,
      "Accion encontradas",
      "Accion no encontradas"
    );
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const postAcciones = async (req, res) => {
  try {
    const acciones = new Acciones(req.body);
    const newAcciones = await acciones.save();
    const response = Response(
      newAcciones,
      "Acciones guardadas",
      "Faltan Datos"
    );
    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(400).send({ error: "Faltan Datos" });
  }
};

export const putAcciones = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const actualizacion = req.body;

    const updatedAcciones = await Acciones.findOneAndUpdate(id, actualizacion, {
      new: true,
    });

    const response = Response(
      updatedAcciones,
      "Acciones Actualizada exitosamente",
      "Acciones no encontrados"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};

export const deleteAcciones = async (req, res) => {
  try {
    const id = { _id: req.params.id };
    const deletedAcciones = await Acciones.findOneAndDelete(id);

    const response = Response(
      deletedAcciones,
      "Acciones Eliminada exitosa",
      "Acciones no encontrados"
    );

    res.status(response.status).json(response.body);
  } catch (error) {
    res.status(500).send({ error: "Error en el servidor" });
  }
};
