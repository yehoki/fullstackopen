const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  const time = new Date();
  const info = persons.length;
  res.send(`
  Phonebook has info for ${info} people
  <br/>
  ${time}`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get(`/api/persons/:id`, (req, res) => {
  const id = Number(req.params.id);
  const findPerson = persons.find((person) => person.id === id);
  if (findPerson) {
    res.json(findPerson);
    console.log("TEST");
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const findFirstFreeId = () => {
  if (persons.length === 0) {
    return 1;
  }
  let highest = 0;
  persons.forEach((person) => {
    if (person.id > highest) {
      highest = person.id;
    }
  });
  const findArr = [];
  for (let i = 0; i < highest; i++) {
    findArr.push(i + 1);
  }
  const personsIds = persons.map((person) => person.id);
  const lowestIdAvail =
    persons.length === findArr.length
      ? highest + 1
      : Math.min(findArr.filter((person) => !personsIds.includes(person)));
  return lowestIdAvail;
};

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).send("The name is missing!");
  } else if (!person.number) {
    return res.status(400).send("The number is missing");
  }

  console.log(person.name.toLowerCase());
  const findNames = persons.filter(
    (personName) => personName.name.toLowerCase() === person.name.toLowerCase()
  );
  console.log(findNames);
  if (findNames.length !== 0) {
    return res
      .status(400)
      .send(`${person.name} already exists in the phonebook!`)
      .end();
  }
  const id = findFirstFreeId();
  const newPerson = {
    id: id,
    name: person.name,
    number: person.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
