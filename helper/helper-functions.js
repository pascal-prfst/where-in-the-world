import axios from "axios";

// fetch the data from the api and reduce it down to to all the necessary information
export async function getAllCountrys() {
  const response = await axios.get("https://restcountries.com/v3.1/all");

  const countries = response.data.map(country => {
    return {
      flags: country.flags.png,
      name: country.name,
      population: country.population,
      region: country.region,
      subregion: country.subregion ? country.subregion : "Unknown",
      capital: country.capital ? country.capital : "Unknown",
      tld: country.tld ? country.tld : "Unknown",
      languages: country.languages ? country.languages : [],
      currencies: country.currencies ? country.currencies : [],
      borders: country.borders ? country.borders : [],
    };
  });

  return countries;
}

// find the country by the slug(name convertet to a string without whitespace and lowercase letters)
export async function getCountryBySlug(slug) {
  const allCountrys = await getAllCountrys();
  const foundCountry = allCountrys.find(
    country => country.name.common.replaceAll(" ", "-").toLowerCase() === slug
  );

  return foundCountry;
}

// turns all the country names into url capable strings
export function changeNamesToSlug(countrys) {
  const convertetCountryNames = countrys.map(country => {
    return { name: country.name.common.replaceAll(" ", "-").toLowerCase() };
  });

  return convertetCountryNames;
}
