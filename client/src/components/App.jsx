import React, { useContext, useMemo, useReducer } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import FilterMenu from "./FilterMenu";
import EmployeeList from "./EmployeeList";
import styled from "styled-components";

const initialState = {
  employeeList: [],
  departmentList: [],
  ageRanges: [],
  ageRangeStrings: [],
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
        employeeList: action.employeeList.slice(0),
        departmentList: action.departmentList.slice(0),
        ageRanges: action.ageRanges.slice(0),
        ageRangeStrings: action.ageRangeStrings.slice(0),
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
