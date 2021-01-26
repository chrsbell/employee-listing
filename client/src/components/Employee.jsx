import React from "react";

const Employee = ({ data }) => {
  const { name, department, age } = data;
  return (
    <>
      <h2>{name}</h2>
      <h2>{department}</h2>
      <h2>{age}</h2>
    </>
  );
};

export default Employee;
