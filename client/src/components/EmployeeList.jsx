import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AppContext from "./AppContext";

const Table = styled.table`
  font-family: "Open Sans", sans-serif;
`;

const Data = styled.td`
  padding: 10px;
`;

const TableHeader = styled.th`
  padding: 10px;
`;

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
    <Table>
      <thead>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Department</TableHeader>
          <TableHeader>Age</TableHeader>
        </tr>
      </thead>
      <tbody>
        {appState.employeeList.map((employee) => (
          <tr key={`${employee.name}tr`}>
            <Data key={`${employee.name}td`}>{employee.name}</Data>
            <Data key={`${employee.name}${employee.department}td`}>
              {employee.department}
            </Data>
            <Data key={`${employee.name}${employee.age}td`}>
              {employee.age}
            </Data>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeList;
