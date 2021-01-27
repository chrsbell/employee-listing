import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import DropdownMenu from "./DropdownMenu";
import SearchBar from "./SearchBar";

const FilterMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  const [department, setDepartment] = useState("");
  const [ageRange, setAgeRange] = useState([]);
  const [query, setQuery] = useState("");

  /**
   * Search by employee name on back-end.
   */
  const search = () => {
    const source = axios.CancelToken.source();
    axios
      .get("/api/employees/search", {
        params: {
          name: query,
          minAge: ageRange.min,
          maxAge: ageRange.max,
          department,
        },
        cancelToken: source.token,
      })
      .then((res) => {
        dispatch({
          type: "employeeInfo",
          employeeList: res.data.list,
          departmentList: res.data.departments,
          ageRanges: res.data.ageRanges,
          ageRangeStrings: res.data.ageRanges.map(
            (range) => `${range.min} - ${range.max}`
          ),
        });
      })
      .catch((err) => {
        console.error(`Couldn't GET /api/employees/search`);
      });
    // Cancel any lingering API requests on component unmount.
    return () => source.cancel();
  };

  return (
    <>
      <DropdownMenu
        name="Departments"
        list={appState.departmentList}
        filterable={appState.departmentList}
        callback={(department) => setDepartment(department)}
      />
      <DropdownMenu
        name="Age Ranges"
        list={appState.ageRangeStrings}
        filterable={appState.ageRanges}
        callback={(range) => setAgeRange(range)}
      />
      <SearchBar callback={(query) => setQuery(query)} />
      <button onClick={search}>Search</button>
    </>
  );
};

export default FilterMenu;
