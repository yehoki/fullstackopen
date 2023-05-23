import { useState, useEffect } from "react";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import { Filter } from "./components/Filter";
import personManipulate from "./services/persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [update, setUpdate] = useState(0);
  const [addMessage, setAddMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");

  useEffect(() => {
    personManipulate.getPersons().then((res) => {
      setPersons(res.data);
    });
  }, [update]);

  const addNewEntry = (event) => {
    event.preventDefault();
    if (checkDuplicateNames(newName)) {
      const lastId = findFirstFreeId();
      const newPerson = {
        name: newName,
        number: newNumber,
        id: lastId,
      };
      personManipulate.addPerson(newPerson).then((res) => {
        setUpdate(update + 1);
        setAddMessage(`${newPerson.name} added`);
        setMessageClass("add-message");
        setTimeout(() => {
          setAddMessage("");
        }, 5000);
      });
    } else {
      const currentPerson = persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )[0];
      if (
        window.confirm(
          `${currentPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const newPerson = {
          name: currentPerson.name,
          number: newNumber,
          id: currentPerson.id,
        };
        personManipulate
          .editPerson(currentPerson.id, newPerson)
          .then((res) => {
            setUpdate(update + 1);
          })
          .catch((error) => {
            setAddMessage(`${currentPerson.name} already deleted`);
            setMessageClass("error-message");
            setTimeout(() => {
              setAddMessage("");
            }, 5000);
          });
      }
    }
  };

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

  const deleteEntry = (event) => {
    const personFound = persons.filter(
      (person) => person.id.toString() === event.target.value
    )[0];
    if (
      window.confirm(`Are you sure you want to delete ${personFound.name}?`)
    ) {
      personManipulate
        .deletePerson(personFound.id)
        .then((res) => {
          setUpdate(update + 1);
          setAddMessage(`${personFound.name} deleted`);
          setMessageClass("error-message");
          setTimeout(() => {
            setAddMessage("");
          }, 5000);
        })
        .catch((error) => {
          setAddMessage(`${personFound.name} already deleted`);
          setMessageClass("error-message");
          setTimeout(() => {
            setAddMessage("");
          }, 5000);
        });
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
      <li key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={deleteEntry} value={person.id}>
          delete
        </button>
      </li>
    ));
  };

  const displayPersons =
    searchValue === "" ? createPersons(persons) : createPersons(filterPersons);

  return (
    <div>
      <h2>Phonebook</h2>
      {addMessage === "" ? (
        <></>
      ) : (
        <Notification message={addMessage} className={messageClass} />
      )}
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
