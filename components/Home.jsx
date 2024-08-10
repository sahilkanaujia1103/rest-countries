import React, { useContext, useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SelectMenu from "../SelectMenu";
import CountriesList from "./CountriesList";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Themecontext } from "../contexts/Themecontext";
import { useWindowsize } from "../Hooks/useWindowsize";
import { useTheme } from "../Hooks/useTheme";

const Home = () => {
  const [query, setquery] = useState("");
  const [isdark] = useTheme();


  return (
    <main className={`${isdark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchBar setquery={setquery} />
        <SelectMenu setquery={setquery} />
      </div>
     
      <CountriesList query={query} />
    </main>
  );
};

export default Home;
