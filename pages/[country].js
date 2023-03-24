import { Fragment, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";

import { changeNamesToSlug, getAllCountrys, getCountryBySlug } from "@/helper/helper-functions";
import ThemeContext from "@/context/theme-context";
import classes from "../styles/Countrypage.module.css";

function CountryPage({ country }) {
  const { darkMode } = useContext(ThemeContext);
  const router = useRouter();

  const languages = Object.values(country.languages);
  const currencies = Object.values(country.currencies);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

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
        <div className={classes.content_container}>
          <div className={classes.image_container}>
            <img src={country.flags} alt={country.title} />
          </div>
          <div className={classes.info_container}>
            <h1>{country.name.common}</h1>
            {/* Left Content */}
            <div className={classes.content}>
              <p>
                <span>Official name: </span>
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
            {/* Right Content */}
            <div className={classes.content}>
              <p>
                <span>Top Level Domain: </span>
                {country.tld}
              </p>
              {currencies.length !== 0 && (
                <p>
                  <span>Currencies: </span>
                  {currencies.map((currencie, index) => {
                    return index === currencies.length - 1
                      ? `${currencie.name}`
                      : `${currencie.name}, `;
                  })}
                </p>
              )}
              {languages.length !== 0 && (
                <p>
                  <span>Languages: </span>
                  {languages.map((language, index) => {
                    return index === languages.length - 1 ? `${language}` : `${language}, `;
                  })}
                </p>
              )}
            </div>
          </div>
          {/* Border Countries */}
          <div className={classes.border_countries_container}>
            <p>Border Countries:</p>
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
