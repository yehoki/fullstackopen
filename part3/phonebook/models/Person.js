const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const mongoURL = process.env.MONGODB_URI;
console.log("connecting to", mongoURL);

mongoose
  .connect(mongoURL)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema);