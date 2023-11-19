import mongoose, { connection, mongo } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb is connected successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDb connection error, Please make sure mongoDb is running.",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
