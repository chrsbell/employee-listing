import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
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
  /**
   * Get all employees on component mount.
   */
  useEffect(() => {
    return getAllEmployees();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {appState.employeeList.map((employee) => (
          <tr key={`${employee.name}tr`}>
            <td key={`${employee.name}td`}>{employee.name}</td>
            <td key={`${employee.name}${employee.age}td`}>{employee.age}</td>
            <td key={`${employee.name}${employee.department}td`}>
              {employee.department}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
