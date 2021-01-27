import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import DeptDropdown from "./DeptDropdown";
import AgeDropdown from "./AgeDropdown";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { DropdownButton } from "./Dropdown";
import { getAllEmployees, searchEmployees } from "./APIMethods";

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
   * Search every time new department or age range selected.
   */
  useEffect(() => searchEmployees(dispatch, query, ageRange, department), [
    department,
    ageRange,
  ]);
  /**
   * Reset the search.
   */
  const reset = () => {
    setDepartment("");
    setAgeRange([]);
    setQuery("");
    dispatch({ type: "reset", value: true });
    return getAllEmployees(dispatch);
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
        <SearchBar changeCallback={(query) => setQuery(query)} />
        <DropdownButton
          onClick={() => searchEmployees(dispatch, query, ageRange, department)}
        >
          Search
        </DropdownButton>
        <DropdownButton onClick={reset}>Reset</DropdownButton>
      </FlexRow>
    </>
  );
};

export default FilterMenu;
