import { useState } from 'react';
import axios from 'axios';
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const res = await axios.get(baseUrl);
    setResources(res.data);
  };

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    setResources([...resources, res.data])
  };

  const service = {
    create,
    getAll
  };
  return [resources, service];
};
