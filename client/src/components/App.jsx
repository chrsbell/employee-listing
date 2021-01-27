import React, { useContext, useMemo, useReducer } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import FilterMenu from "./FilterMenu";
import EmployeeList from "./EmployeeList";

const initialState = {
  employeeList: [],
  departmentList: [],
  ageRanges: [],
  ageRangeStrings: [],
};

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
      <h1>Employee Listing</h1>
      <FilterMenu />
      <EmployeeList />
    </AppContext.Provider>
  );
};

export default App;
