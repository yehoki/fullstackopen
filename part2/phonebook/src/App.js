import { useState, useEffect } from "react";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import personManipulate from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    personManipulate.getPersons().then((res) => {
      setPersons(res.data);
    });
  }, [update]);

  const addNewEntry = (event) => {
    event.preventDefault();
    if (checkDuplicateNames(newName)) {
      const lastId = persons.length === 0 ? 1 : persons.slice(-1)[0].id;
      const newPerson = {
        name: newName,
        number: newNumber,
        id: lastId + 1,
      };
      personManipulate.addPerson(newPerson).then((res) => {
        setUpdate(update + 1);
      });
    } else {
      alert(`${newName} already exists!`);
    }
  };

  const deleteEntry = (event) => {
    const personFound = persons.filter((person) => person.id.toString() === event.target.value)[0];
    personManipulate.deletePerson(personFound.id).then((res) => {
      setUpdate(update + 1);
    })
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
      <li key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={deleteEntry} value={person.id}>delete</button>
      </li>
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
