import { Fragment, useContext } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

import { changeNamesToSlug, getAllCountrys, getCountryBySlug } from "@/helper/helper-functions";
import ThemeContext from "@/context/theme-context";
import classes from "../styles/Countrypage.module.css";

function CountryPage({ country }) {
  const { darkMode } = useContext(ThemeContext);

  console.log(country.flags);

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
          {/* <div className={classes.image_container}>
            <img src={country.flags} alt={country.name} />
          </div> */}
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
              </div>
            </div>
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
