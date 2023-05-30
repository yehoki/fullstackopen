require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/Person");
const PORT = process.env.PORT || 3000;

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("post-req", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-req"
  )
);

app.get("/", (req, res) => {
  const time = new Date();
  let info;
  Person.find({}).then((persons) => {
    res.send(`
    Phonebook has info for ${persons.length} people
    <br/>
    ${time}`);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.get(`/api/persons/:id`, (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
  // const findPerson = persons.find((person) => person.id === id);
  // if (findPerson) {
  //   res.json(findPerson);
  // } else {
  //   res.status(404).end();
  // }
});

app.delete("/api/persons/:id", (req, res) => {
  // const id = Number(req.params.id);
  // persons = persons.filter((person) => person.id !== id);
  // res.status(204).end();
});

const findFirstFreeId = () => {
  // if (persons.length === 0) {
  //   return 1;
  // }
  // let highest = 0;
  // persons.forEach((person) => {
  //   if (person.id > highest) {
  //     highest = person.id;
  //   }
  // });
  // const findArr = [];
  // for (let i = 0; i < highest; i++) {
  //   findArr.push(i + 1);
  // }
  // const personsIds = persons.map((person) => person.id);
  // const lowestIdAvail =
  //   persons.length === findArr.length
  //     ? highest + 1
  //     : Math.min(findArr.filter((person) => !personsIds.includes(person)));
  // return lowestIdAvail;
};

app.post("/api/persons", (req, res) => {
  // const person = req.body;
  // if (!person.name) {
  //   return res.status(400).send("The name is missing!");
  // } else if (!person.number) {
  //   return res.status(400).send("The number is missing");
  // }
  // const findNames = persons.filter(
  //   (personName) => personName.name.toLowerCase() === person.name.toLowerCase()
  // );
  // if (findNames.length !== 0) {
  //   return res
  //     .status(400)
  //     .send(`${person.name} already exists in the phonebook!`)
  //     .end();
  // }
  // const id = findFirstFreeId();
  // const newPerson = {
  //   id: id,
  //   name: person.name,
  //   number: person.number,
  // };
  // persons = persons.concat(newPerson);
  // res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
