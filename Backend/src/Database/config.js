import mongoose from "mongoose";

async function conectDB() {
  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `Conexion a mongo en el server ${connectionDB.connection.host} en el puerto ${connectionDB.connection.port}`;
    console.log(url);
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
}

export default conectDB;
