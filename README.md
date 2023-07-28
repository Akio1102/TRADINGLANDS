# TRADINGLANDS

El proyecto consiste en la creación de una API para gestionar las transacciones de un inversionista.

## Explicación del Proyecto

1. [Requisitos Previos](#requisitos-previos)
2. [Paquetes De Backend](#paquetes-de-backend)
3. [Instalación](#instalación)
4. [Ejecutar El Servidor](#ejecutar-el-servidor)
5. [Explicación](#explicación)

## Requisitos Previos

- [Node.js](https://nodejs.org/es)
- [Tener la base de datos en MongoDB](https://www.mongodb.com/es)
- [Configuración variables de Entorno](#configuración-variables-de-entorno)

## Paquetes De Backend

- [Express.js](https://expressjs.com/es/)
- [Cors](https://github.com/expressjs/cors#readme)
- [Dotenv](https://github.com/motdotla/dotenv#readme)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Instalación

Comenzamos instalando los paquetes que son necesarios en el proyecto para hacer esto ejecutamos el siguiente comando

```bash
    cd Backend
    npm i
```

## Ejecutar El Servidor

Con el siguiente comando ejecutamos el servidor, ya con esto podremos entrar a las rutas para observar la informacion de la base de datos

```bash
    npm run dev
```

## Explicación

Con el siguiente comando ejecutamos el servidor, ya con esto podremos entrar a las rutas para observar la informacion de la base de datos

| Carpeta                                     |                                            Contiene                                             |
| ------------------------------------------- | :---------------------------------------------------------------------------------------------: |
| Backend                                     |                       Cotiene todo el codigo de Backend para el servidor                        |
| node_modules                                |  Esta Carpeta se crea cuando ejecutamos el comando de instalacion/descarga de paquetes con npm  |
| [src](#carpetas-de-sourcesrc)               | Esta Carpeta contiene todas las carpeta de los Controllers, Db, Routes y el codigo del servidor |
| [.env](#configuración-variables-de-entorno) |           En este archivo se guarda la configuración para hacer la conexión con mysql           |
| package.json                                |          Toda la información del proyecto referente a versiones y paquetes instalados           |

Recuerda que asi sera el schema de los documento que se manejaran en MongoDB

Ejemplo del documento de "acciones"

```json
{
  "nombre": "Plata",
  "cantidad": 100
}
```

Ejemplo del documento de "dineros"

```json
{
  "criptomonedas": "ethreum",
  "fiat": "dolar"
}
```

Ejemplo del documento de "traders"

```json
{
  "nombre": "Cristian Diaz",
  "edad": 20,
  "nacionalidad": "Colombiano",
  "presupuesto": 7891000000
}
```

### Configuración Variables de Entorno

Dentro de la carpeta Backend creamos un archivo `.env` esta carpeta es la que contendra la configuración de la conexión con MongoDB. El Archivo contiene guardado el **PORT** Puerto del Servidor - **MONGO_URI** Link para la conexion con MongoDB.

```env
PORT = 3000
MONGO_URI = link_mongo
```

### Carpetas de Source(src)

La carpeta [src](./Backend/src/) contiene las siguientes Carpetas y Archivos Generales

| Carpeta                             |                           Contiene                           |
| ----------------------------------- | :----------------------------------------------------------: |
| [Controllers](#controllers)         | Contiene los controlladores de los datos de la base de datos |
| [Database](./Backend/src/Database/) |             Conexión a la base de datos MongoDB              |
| [Models](./Backend/src/Models/)     |        Contiene los Models de los Schemas de MongoDB         |
| [Routes](#routes)                   |                    Creación de las Rutas                     |

- [main.js](./Backend/src/main.js) El Archivo contiene la instancia del Servidor para posteriormnete con el metodo listen ejecutamos el servidor.

### Archivos

#### Controllers

En esta carpeta se encuentran los módulos de controladores correspondientes a cada Documento de la base de datos. Cada módulo incluye las siguientes funciones:

```js
import Acciones from "../Models/Accion.js";
import Response from "./Response.js";
```

Donde se importa el modelo de cada documeno y el responde para responder las peticiones.

`GET`: Permite obtener los datos de cada documento.

```js
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
```

La función anterior es un endpoint de tipo GET que recupera todos los registros del documento "acciones" de la base de datos. Utiliza el método find() para ejecutar la consulta en MongoDB y devuelve el resultado como una respuesta JSON. Si ocurre algún error durante la operación, se enviará un mensaje de error con el estado 500.

```js
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
```

Tambien hay un endpoint de tipo GET para recibir un id y devolver el reistro del documento "acciones".

`POST`: Insertar nuevos registros en el documento "acciones"

```js
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
```

La función anterior es un endpoint de tipo POST que permite insertar nuevos registros en el documento "acciones" de la base de datos. Los datos necesarios se extraen del cuerpo de la solicitud en formato JSON y se utilizan para crear un nuevo objeto Acciones. Luego, se guarda el nuevo objeto en la base de datos utilizando el método save(). Se crea una respuesta con la información del registro guardado y se envía como una respuesta JSON. Si faltan datos en la solicitud, se enviará un mensaje de error con el estado 400.

`PUT`: Actualizar registro en el documento "acciones"

```js
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
```

Este endpoint es de tipo PUT y permite actualizar un registro específico del documento "acciones" de la base de datos. Los datos necesarios para la actualización se obtienen del cuerpo de la solicitud en formato JSON. Se utiliza el parámetro req.params.id para identificar el registro que se va a actualizar mediante su identificador único (ID).

La función utiliza findOneAndUpdate() para buscar el registro con el ID proporcionado y realizar la actualización con los datos recibidos. La opción { new: true } asegura que se devuelvan los datos actualizados después de realizar la operación.

Si la actualización es exitosa, se crea una respuesta con la información del registro actualizado y se envía como una respuesta JSON. En caso de que no se encuentre el registro con el ID proporcionado, se enviará un mensaje de error con el estado 404.

`DELETE` - Eliminar registro en el documento "acciones"

```js
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
```

Este endpoint es de tipo DELETE y permite eliminar un registro específico del documento "acciones" de la base de datos. Utiliza el parámetro req.params.id para identificar el registro que se va a eliminar mediante su identificador único (ID).

La función utiliza findOneAndDelete() para buscar el registro con el ID proporcionado y eliminarlo de la base de datos. Si se encuentra y elimina el registro con éxito, se crea una respuesta con la información del registro eliminado y se envía como una respuesta JSON.

Si no se encuentra el registro con el ID proporcionado, se enviará un mensaje de error con el estado 404. En caso de que ocurra algún error durante la operación, se enviará un mensaje de error con el estado 500.

#### Routes

En esta carpeta podremos encontrar los módulos de rutas los cuales serviran de EndPoint e invocacion de los controlladores de cada respectiva Tabla de la base de Datos

```js
import { Router } from "express";
import {
  getAcciones,
  getAccionID,
  postAcciones,
  putAcciones,
  deleteAcciones,
} from "../Controllers/Acciones.controllers.js";

const router = Router();
const path = `/api/acciones`;

router.get(path, getAcciones);
router.get(`${path}/:id`, getAccionID);
router.post(path, postAcciones);
router.put(`${path}/:id`, putAcciones);
router.delete(`${path}/:id`, deleteAcciones);

export default router;
```

| Import                                                                   | From                                             | Descripcion                                                                                                                                      |
| ------------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Router`                                                                 | [Express](https://www.npmjs.com/package/express) | Importamos el modulo de rutas de Express para la creación de los EndPoints                                                                       |
| [Metodos Controllers](./Backend/src/Controllers/Acciones.controllers.js) | [Controllers](./Backend/src/Controllers/)        | Importamos el los metodos get,post,put,delete de los controlladores documento "acciones" para traer los datos y enviar los datos respectivamente |
