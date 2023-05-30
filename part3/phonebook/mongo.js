require("dotenv").config()
const mongoose = require("mongoose");
const Person = require("./models/Person");

async function getAll() {
    const people = await Person.find({});
    console.log("Phonebook:")
    people.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
    })
}

if (process.argv.length < 3) {
  console.log("Please provide a password");
  process.exit(1);
}

const password = process.argv[2];
const mongoURL = `mongodb+srv://testuser:${password}@bookmarkt.vm0t4pg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
await mongoose.connect(mongoURL).then(() => {
});

if (process.argv.length === 3) {
  await getAll();
  mongoose.connection.close();
  process.exit(1);
}

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name: name,
  number: number,
});

await person.save();
console.log(`Added ${name} with number ${number} to the phonebook`);
mongoose.connection.close();
