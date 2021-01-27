import React, { useContext } from "react";
import AppContext from "./AppContext";

const SearchBar = ({ callback }) => {
  const { appState, dispatch } = useContext(AppContext);

  return (
    <>
      <h2>Search by employee name:</h2>
      <input type="text" id="name" onChange={(e) => callback(e.target.value)} />
    </>
  );
};

export default SearchBar;
