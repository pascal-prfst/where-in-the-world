import { Fragment, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

import { changeNamesToSlug, getAllCountrys, getCountryBySlug } from "@/helper/helper-functions";
import ThemeContext from "@/context/theme-context";
import classes from "../styles/Countrypage.module.css";

function CountryPage({ country }) {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  /*  const languages = Object.values(country.languages); */
  const currencies = Object.values(country.currencies);
  const regionNames = new Intl.DisplayNames(["en", "SR"], { type: "region" });
  const countryBorders = country.borders;
  const getCountryISO2 = require("country-iso-3-to-2");
  const fUllNameBorderCountrys = [];
  if (countryBorders.length !== 0) {
    try {
      countryBorders.forEach(country => {
        fUllNameBorderCountrys.push(regionNames.of(getCountryISO2(country)));
      });
    } catch (err) {
      console.log(err);
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(country.borders);

  return (
    <Fragment>
      <section
        className={
          darkMode
            ? `${classes.countrypage_content_container} ${classes.dark_mode_font}`
            : classes.countrypage_content_container
        }>
        <Link href="/">
          <button
            type="button"
            className={
              darkMode ? `${classes.back_btn} ${classes.back_btn_dark}` : `${classes.back_btn}`
            }>
            <span>
              <BiArrowBack className={classes.btn_icon} /> Back
            </span>
          </button>
        </Link>
        <div className={classes.responsive_container}>
          <div className={classes.image_container}>
            <img src={country.flags} alt={country.name} />
          </div>
          <div>
            <h1>{country.name.common}</h1>
            <div className={classes.content_container}>
              <div className={classes.content}>
                <p>
                  <span>Native name: </span>
                  {country.name.official}
                </p>
                <p>
                  <span>Population: </span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span>Region: </span>
                  {country.region}
                </p>
                <p>
                  <span>Sub Region: </span>
                  {country.subregion}
                </p>
                <p>
                  <span>Capital: </span>
                  {country.capital}
                </p>
              </div>
              <div className={classes.content}>
                <p>
                  <span>Top Level Domain: </span>
                  {country.tld}
                </p>
                {/* {currencies.length !== 0 && (
                  <p>
                    <span>Currencies: </span>
                    {currencies.map((currencie, index) => {
                      return index === currencies.length - 1
                        ? `${currencie.name}`
                        : `${currencie.name}, `;
                    })}
                  </p>
                )} */}
                {/* {languages && (
                  <p>
                    <span>Languages: </span>
                    {languages.map((language, index) => {
                      return index === languages.length - 1 ? `${language}` : `${language}, `;
                    })}
                  </p>
                )} */}
              </div>
            </div>

            {countryBorders.length !== 0 && (
              <Fragment>
                <h2>Border Countries</h2>
                <div className={classes.border_countrys_container}>
                  {fUllNameBorderCountrys.map((country, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          darkMode
                            ? `${classes.border_country} ${classes.border_country_dark}`
                            : classes.border_country
                        }>
                        {country}
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const countrySlug = context.params.country;
  const country = await getCountryBySlug(countrySlug);

  return {
    props: {
      country: country,
    },
  };
}

export async function getStaticPaths() {
  const countrys = await getAllCountrys();
  const slugArray = changeNamesToSlug(countrys);

  const paths = slugArray.map(slug => ({ params: { country: slug.name } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default CountryPage;
