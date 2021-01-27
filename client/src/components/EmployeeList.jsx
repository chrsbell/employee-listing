import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Employee from "./Employee";
import AppContext from "./AppContext";

const EmployeeList = () => {
  const { appState, dispatch } = useContext(AppContext);
  /**
   * Receives the entire list of employees.
   */
  const getAllEmployees = () => {
    const source = axios.CancelToken.source();
    axios
      .get("/api/employees", { cancelToken: source.token })
      .then((res) => {
        dispatch({ type: "categoryList", categoryList: res.data.categories });
        dispatch({ type: "employeeList", employeeList: res.data.list });
      })
      .catch((err) => {
        console.error(`Couldn't GET /api/employees`);
      });
    // Cancel any lingering API requests on component unmount.
    return () => source.cancel();
  };
  /**
   * Get all employees on component mount.
   */
  useEffect(() => {
    return getAllEmployees();
  }, []);
  /**
   * Component render.
   */
  return appState.employeeList.map((employee) => (
    <Employee key={employee.name} data={employee} />
  ));
};

export default EmployeeList;
