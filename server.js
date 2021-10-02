const app = require("./app");
const mongoose = require("mongoose");

const init = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n1nxw.mongodb.net/ezremoval?retryWrites=true&w=majority`
  );
  app.listen(process.env.PORT, () => {
    console.log("Connected to DB and listening");
  });
};

init();
