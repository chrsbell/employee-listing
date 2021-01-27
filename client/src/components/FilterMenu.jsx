import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import DeptDropdown from "./DeptDropdown";
import AgeDropdown from "./AgeDropdown";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { DropdownButton } from "./Dropdown";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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
        console.log(res.data);
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
  useEffect(() => {
    search();
    console.log(department, ageRange);
  }, [department, ageRange]);
  /**
   * Reset the search.
   */
  const reset = () => {
    setDepartment("");
    setAgeRange([]);
    setQuery("");
    const source = axios.CancelToken.source();
    axios
      .get("/api/employees", { cancelToken: source.token })
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
        console.error(`Couldn't GET /api/employees`);
      });
    // Cancel any lingering API requests on component unmount.
    return () => source.cancel();
  };
  return (
    <>
      <FlexRow>
        <DeptDropdown
          departments={appState.departmentList}
          callback={(department) => {
            setDepartment(department);
          }}
        />
        <AgeDropdown
          ranges={appState.ageRangeStrings}
          filterable={appState.ageRanges}
          callback={(range) => {
            setAgeRange(range);
          }}
        />
      </FlexRow>
      <FlexRow>
        <SearchBar callback={(query) => setQuery(query)} />
        <DropdownButton onClick={search}>Search</DropdownButton>
        <DropdownButton onClick={reset}>Reset</DropdownButton>
      </FlexRow>
    </>
  );
};

export default FilterMenu;
