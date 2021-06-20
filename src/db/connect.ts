import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(
  `${process.env.DB_HOST}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("\x1b[36m%s\x1b[0m", "Connected to DB success");
  }
);

export default mongoose.connection;
