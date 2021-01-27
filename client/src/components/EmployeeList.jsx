import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AppContext from "./AppContext";
import { getAllEmployees } from "./APIMethods";

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
   * Get all employees on component mount.
   */
  useEffect(() => getAllEmployees(dispatch), []);

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
