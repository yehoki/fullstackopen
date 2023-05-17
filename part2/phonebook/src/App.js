import { useState } from "react";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addNewEntry = (event) => {
    event.preventDefault();
    if (checkDuplicateNames(newName)) {
      const lastId = persons.slice(-1)[0].id;
      const newPerson = {
        name: newName,
        number: newNumber,
        id: lastId + 1,
      };
      const newPersons = [...persons, newPerson];
      setPersons(newPersons);
    } else {
      alert(`${newName} already exists!`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const checkDuplicateNames = (name) => {
    return (
      persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).length === 0
    );
  };

  const createPersons = (personList) => {
    return personList.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{" "}
      </p>
    ));
  };

  const displayPersons =
    searchValue === "" ? createPersons(persons) : createPersons(filterPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchValue} searchChange={handleSearch} />
      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={addNewEntry}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={displayPersons} />
    </div>
  );
};

export default App;
