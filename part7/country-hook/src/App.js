import React, { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if (name !== '') {
      axios
        .get(`${baseUrl}/name/${name}`)
        .then((res) => {
          console.log(res, res.data, 'country');
          setCountry({ data: res.data, found: true });
        })
        .catch((err) => setCountry({ found: false }));
    }
  }, [name]);
  return country;
};

const numberConverter = (number) => {
  if (number / 1000 <= 1) {
    return number;
  } else if (number / 1000 > 1 && number / 1000000 <= 1) {
    const leadingNumbers = (number / 1000).toFixed(2);
    return `${leadingNumbers}K`;
  } else if (number / 1000000 > 1 && number / 1000000000 <= 1) {
    const leadingNumbers = (number / 1000000).toFixed(2);
    return `${leadingNumbers}M`;
  } else {
    return `${(number / 1000000000).toFixed(2)}B`;
  }
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {numberConverter(country.data.population)}</div>
      <img
        src={country.data.flags.svg}
        height="100"
        alt={`flag of ${country.data.name}`}
        style={{ border: '1px solid black', marginTop: '0.25rem' }}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
