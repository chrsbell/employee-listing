import React, { useContext } from "react";
import AppContext from "./AppContext";
import styled from "styled-components";

const Input = styled.input`
  border: 10px;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  text-overflow: ellipsis;
  margin: 10px 0 10px 0;
  font-family: "Open Sans", sans-serif;
`;

const SearchBar = ({ callback }) => {
  const { appState, dispatch } = useContext(AppContext);

  return (
    <Input
      placeholder="Search by name..."
      type="text"
      id="name"
      onChange={(e) => callback(e.target.value)}
    />
  );
};

export default SearchBar;
