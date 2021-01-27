import styled from "styled-components";

const DropdownButton = styled.button`
  background-color: rgb(220, 220, 220);
  border-style: none;
  outline: none;
  color: black;
  padding: 5px;
  margin: 0 10px 0 10px;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
`;

const DropdownContent = styled.div`
  &.active {
    display: block;
  }
  &.none {
    display: none;
  }
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 1;
`;

const DropdownEntry = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export { DropdownButton, DropdownContent, DropdownEntry, Dropdown };
