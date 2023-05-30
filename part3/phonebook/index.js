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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(err);
};

// app.get("/", (req, res) => {
//   const time = new Date();
//   Person.find({}).then((persons) => {
//     res.send(`
//     Phonebook has info for ${persons.length} people
//     <br/>
//     ${time}`);
//   });
// });

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err));
});

app.get(`/api/persons/:id`, (req, res, next) => {
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
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const data = req.body;
  if (data.name === undefined) {
    return res.status(400).json({ error: "Name missing" });
  }

  const person = new Person({
    name: data.name,
    number: data.number,
  });
  person.save().then((savedPerson) => res.json(savedPerson));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person)
    .then((newPerson) => res.json(newPerson))
    .catch((err) => next(err));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
