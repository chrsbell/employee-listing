import React, { useContext, useRef, useEffect, useState } from "react";
import AppContext from "./AppContext";
import styled from "styled-components";
import { getAllEmployees } from "./APIMethods";

const Input = styled.input`
  border: 10px;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  text-overflow: ellipsis;
  margin: 10px 0 10px 0;
  font-family: "Open Sans", sans-serif;
`;

const SearchBar = ({ changeCallback, resetCallback }) => {
  const { appState, dispatch } = useContext(AppContext);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (appState.searchReset) {
      console.log("reset search bar");
      setInput("");
      dispatch({ type: "reset", value: false });
    }
  }, [appState.searchReset]);

  return (
    <Input
      placeholder="Search by name..."
      type="text"
      id="name"
      ref={inputRef}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
        changeCallback(e.target.value);
      }}
    />
  );
};

export default SearchBar;
