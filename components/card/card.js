import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import ThemeContext from "@/context/theme-context";
import classes from "./Card.module.css";

function Card({ image, name, population, region, capital }) {
  const { darkMode } = useContext(ThemeContext);
  const countrySlug = name.toLowerCase().replaceAll(" ", "-");

  return (
    <Link className={classes.link} href={`/${countrySlug}`}>
      <div className={classes.card}>
        <div className={classes.image_container}>
          <Image
            src={image}
            alt={name}
            className={classes.flag}
            width={265}
            height={150}
          />
        </div>
        <div
          className={
            darkMode
              ? `${classes.card_content} ${classes.card_content_dark}`
              : `${classes.card_content}`
          }>
          <h2>{name}</h2>
          <p>
            <span>Population: </span>
            {population.toLocaleString()}
          </p>
          <p>
            <span>Region: </span>
            {region}
          </p>
          <p>
            <span>Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
