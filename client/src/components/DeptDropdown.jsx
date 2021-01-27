import React, { useState } from "react";
import axios from "axios";
import onClickOutside from "react-onclickoutside";
import {
  DropdownButton,
  DropdownContent,
  DropdownEntry,
  Dropdown,
} from "./Dropdown";

const DeptDropdown = ({ departments, callback }) => {
  const [className, setClassName] = useState("none");
  /**
   * Reset the className on outside click.
   */
  DeptDropdown.handleClickOutside = () => {
    setClassName("none");
  };
  return (
    <Dropdown>
      <DropdownButton onClick={() => setClassName("active")}>
        Departments
      </DropdownButton>
      <DropdownContent className={className}>
        {departments.map((department) => (
          <DropdownEntry
            href="#"
            key={department}
            onClick={() => {
              setClassName("none");
              callback(department);
            }}
          >
            {department}
          </DropdownEntry>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => DeptDropdown.handleClickOutside,
};

export default onClickOutside(DeptDropdown, clickOutsideConfig);
