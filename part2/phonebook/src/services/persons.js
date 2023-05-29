import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getPersons = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

// const editPerson = (id, newPerson) => {
//   return axios.put(`${baseUrl}/${id}`, newPerson)
// }

const personManipulate = {
  getPersons: getPersons,
  addPerson: addPerson,
  deletePerson: deletePerson,
  // editPerson: editPerson
};
export default personManipulate;
