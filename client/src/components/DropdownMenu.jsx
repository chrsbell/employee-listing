import React from "react";
import axios from "axios";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import AppContext from "./AppContext";
import SearchBar from "./SearchBar";

const DropdownButton = styled.button`
  background-color: #2455cc;
  border-radius: 10px;
  border-style: none;
  outline: none;
  color: white;
  padding: 5px;
  font-size: 16px;
`;

const DropdownContent = styled.div.attrs((props) => {
  console.log(props.className);
  return {
    className: props.className,
  };
})`
  display: block;
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

class DropdownMenu extends React.Component {
  constructor({ name, list, filterable, callback }) {
    super();
    this.state = {
      className: "none", // className for DropdownContent
    };
    this.name = name;
    this.list = list;
    this.filterable = filterable;
    this.callback = callback;
    this.setHovered = this.setHovered.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside() {
    this.setState({ className: "none" });
  }
  setHovered() {
    this.setState({ className: "active" });
  }
  render() {
    const { name, list, filterable, callback } = this;
    const { className } = this.state;
    return (
      <Dropdown>
        <DropdownButton onClick={this.setHovered}>{name}</DropdownButton>
        <DropdownContent className={className}>
          {list.map((item, i) => (
            <>
              <DropdownEntry
                href="#"
                key={item}
                onClick={() => this.callback(filterable[i])}
              >
                {item}
              </DropdownEntry>
            </>
          ))}
        </DropdownContent>
      </Dropdown>
    );
  }
}

const clickOutsideConfig = {
  handleClickOutside: function (instance) {
    return instance.handleClickOutside;
  },
};

export default onClickOutside(DropdownMenu, clickOutsideConfig);
