import React, { useContext, useMemo, useReducer } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import EmployeeList from "./EmployeeList";

const initialState = {
  employeeList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "employeeList":
      debugger;
      return {
        ...state,
        employeeList: action.employeeList,
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
      <EmployeeList />
    </AppContext.Provider>
  );
};

export default App;
