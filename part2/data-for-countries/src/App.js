import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import countryData from "./services/countries";
import { Country } from "./components/Country";
import { ListedCountry } from "./components/ListedCountry";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchCountries, setSearchCountries] = useState([]);

  useEffect(() => {
    countryData.getAllCountries().then((res) => {
      const countries = res.data;
      setAllCountries(countries);
    });
  }, []);

  const handleFilter = (event) => {
    setSearchValue(event.target.value);
    filterCountries(event);
  };

  const filterCountries = (event) => {
    const filteredCountries = allCountries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setSearchCountries(filteredCountries);
  };

  const changeCurrentCountry = (country) => {
    setSearchCountries([country]);
  };

  const makeSearchCountries = () => {
    if (searchCountries.length === 0) {
      return <></>;
    } else if (searchCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (searchCountries.length === 1) {
      const country = searchCountries[0];
      const countryName = country.name.common;
      const capital = country.capital;
      const area = country.area;
      const population = country.population;
      const flagSVG = country.flags.svg;
      const flagALT = country.flags.alt;
      const languages = Object.values(searchCountries[0].languages);
      return (
        <Country
          countryName={countryName}
          capital={capital}
          area={area}
          languages={languages}
          flagLink={flagSVG}
          flagAlt={flagALT}
          population={population}
        />
      );
    } else {
      const currentCountries = searchCountries.map(
        (country) => country.name.common
      );
      // Edge case example:
      // Makes sure Sudan shows up when we type "Sudan" instead of a list
      // containing Sudan and South Sudan
      const checkHiddenCountry = currentCountries.some(
        (country) => country.toLowerCase() === searchValue.toLowerCase()
      );
      if (checkHiddenCountry) {
        const country = searchCountries.filter(
          (countryObj) =>
            countryObj.name.common.toLowerCase() === searchValue.toLowerCase()
        )[0];
        const countryName = country.name.common;
        const capital = country.capital;
        const area = country.area;
        const population = country.population;
        const flagSVG = country.flags.svg;
        const flagALT = country.flags.alt;
        const languages = Object.values(searchCountries[0].languages);
        return (
          <Country
            countryName={countryName}
            capital={capital}
            area={area}
            languages={languages}
            flagLink={flagSVG}
            flagAlt={flagALT}
            population={population}
          />
        );
      }
      return searchCountries.map((country) => (
        <ListedCountry
          countryName={country.name.common}
          onClick={() => changeCurrentCountry(country)}
        />
      ));
    }
  };

  return (
    <div>
      <Search value={searchValue} onChange={handleFilter} />
      {makeSearchCountries()}
    </div>
  );
}

export default App;
