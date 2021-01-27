import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "./AppContext";

const SearchBar = () => {
  const { appState, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  /**
   * Search by employee name on back-end.
   */
  const search = () => {
    const source = axios.CancelToken.source();
    axios
      .get("/api/employees/search", {
        params: { term: searchTerm },
        cancelToken: source.token,
      })
      .then((res) => {
        dispatch({ type: "categoryList", categoryList: res.data.categories });
        dispatch({ type: "employeeList", employeeList: res.data.list });
      })
      .catch((err) => {
        console.error(`Couldn't GET /api/employees/search`);
      });
    // Cancel any lingering API requests on component unmount.
    return () => source.cancel();
  };
  /**
   * Component render.
   */
  return (
    <>
      <h2>Search by employee name:</h2>
      <input
        type="text"
        id="name"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={search}>Search</button>
    </>
  );
};

export default SearchBar;
