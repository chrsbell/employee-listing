import React, { useContext, useMemo, useReducer } from "react";
import AppContext from "./AppContext";
import FilterMenu from "./FilterMenu";
import EmployeeList from "./EmployeeList";
import styled from "styled-components";

const initialState = {
  employeeList: [],
  departmentList: [],
  ageRanges: [],
  ageRangeStrings: [],
  searchReset: false,
};

const Header = styled.h2`
  font-family: "Open Sans", sans-serif;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const reducer = (state, action) => {
  switch (action.type) {
    case "employeeInfo":
      return {
        ...state,
        employeeList: action.employeeList,
        departmentList: action.departmentList,
        ageRanges: action.ageRanges,
        ageRangeStrings: action.ageRangeStrings,
      };
    case "reset":
      return {
        ...state,
        searchReset: action.value,
      };
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  /**
   * Prevent re-renders of every child component
   */
  const contextMemo = useMemo(() => {
    return { appState, dispatch };
  }, [appState, dispatch]);

  return (
    <AppContext.Provider value={contextMemo}>
      <Body>
        <Header>Employee Listing</Header>
        <FilterMenu />
        <EmployeeList />
      </Body>
    </AppContext.Provider>
  );
};

export default App;
