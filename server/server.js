const mongoose = require("mongoose");

const mongo_connect = async () => {
  mongoose.connect(
    process.env.MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err
        ? console.log("Database : Failed to connect")
        : console.log("Database : Successfully Connected")
  );
};

export default mongo_connect;
