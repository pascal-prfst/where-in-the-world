import { useState, useContext, useEffect } from "react";
import { Fragment } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Select from "react-select";

import { getAllCountrys } from "@/helper/helper-functions";
import Card from "@/components/card/card";
import ThemeContext from "@/context/theme-context";
import classes from "../styles/Homepage.module.css";

function HomePage(props) {
  const [countries, setCountries] = useState(props.countries);
  const [filterOption, setFilterOption] = useState("all");
  const [input, setInput] = useState("");

  const { darkMode } = useContext(ThemeContext);

  const options = [
    { value: "all", label: "All" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "America" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
  ];

  useEffect(() => {
    const filteredCountries = props.countries.filter(country => {
      return country.name.common.toLowerCase().includes(input.toLowerCase());
    });
    setCountries(filteredCountries);

    if (input === "") {
      setCountries(props.countries);
    }
  }, [input]);

  useEffect(() => {
    if (filterOption === "all") {
      setCountries(props.countries);
    } else {
      const filteredCountries = props.countries.filter(country => {
        return country.region === filterOption;
      });
      setCountries(filteredCountries);
    }
  }, [filterOption]);

  function handleOnChange(event) {
    setFilterOption("all");
    setInput(event.target.value);
  }

  return (
    <Fragment>
      <div className={classes.filter_options}>
        <div className={classes.input_container}>
          <AiOutlineSearch
            className={
              darkMode ? `${classes.icon} ${classes.icon_dark}` : `${classes.icon}`
            }
          />
          <input
            className={
              darkMode ? `${classes.input} ${classes.input_dark}` : `${classes.input}`
            }
            placeholder="Search for a country..."
            value={input}
            onChange={handleOnChange}
          />
        </div>
        <Select
          id="long-value-select"
          instanceId="long-value-select"
          onChange={event => setFilterOption(event.value)}
          className={classes.select_options}
          options={options}
          placeholder="Filter by Region"
        />
      </div>
      <div className={classes.card_grid}>
        {countries.map(country => {
          return (
            <Card
              key={country.name.common}
              image={country.flags}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const countryData = await getAllCountrys();

  return {
    props: {
      countries: countryData,
    },
  };
}

export default HomePage;
