import React, { useContext, useEffect, useState } from "react";

import "./CountriesDetails.css";
import {
  Link,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Themecontext } from "../contexts/Themecontext";
import { useWindowsize } from "../Hooks/useWindowsize";
import { useTheme } from "../Hooks/useTheme";

export default function CountriesDetails() {
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;
  const [countryData, setCountryData] = useState(null);
  const [notfound, setnotfound] = useState(false);
  const [isdark] =useTheme();

  function updateState(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0].common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      flag: data.flags.svg,
      tld: data.tld,
      borders: [],
      languages: Object.values(data.languages || {}).join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => {
            return res.json();
          })
          .then(([borderdata]) => borderdata.name.common);
      })
    ).then((allBorders) => {
      setTimeout(() =>
        setCountryData((prev) => ({ ...prev, borders: allBorders }))
      );
    });
  }

  useEffect(() => {
    if (state) {
      updateState(state);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateState(data);
      })
      .catch((err) => {
        setnotfound(true);
      });
  }, [countryName]);
  if (notfound) {
    return <div>///Country not Found or invalid country name.....</div>;
  }
  return countryData === null ? (
    "loading..."
  ) : (
    <main className={`${isdark ? "dark" : ""}`}>
     
      <div className="country-details-container">
        <span
          className="back-button"
          onClick={() => {
            history.back();
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: {countryData.nativeName}</b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {countryData.population.toLocaleString("en-IN")}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {countryData.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {countryData.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {countryData.capital.join(", ")}</b>
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {countryData.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {countryData.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {countryData.languages}</b>
                <span className="languages"></span>
              </p>
            </div>
            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => {
                  return (
                    <Link key={border} to={`/${border}`}>
                      {" "}
                      {border}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
