import React, { useContext, useMemo, useReducer } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import EmployeeList from "./EmployeeList";
import SearchBar from "./SearchBar";

const initialState = {
  employeeList: [],
  categoryList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "employeeList":
      return {
        ...state,
        employeeList: action.employeeList,
      };
    case "categoryList":
      return {
        ...state,
        categoryList: action.categoryList,
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
      <SearchBar />
      <EmployeeList />
    </AppContext.Provider>
  );
};

export default App;
