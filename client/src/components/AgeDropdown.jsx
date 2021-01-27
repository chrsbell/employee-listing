import React, { useState } from "react";
import axios from "axios";
import onClickOutside from "react-onclickoutside";
import {
  DropdownButton,
  DropdownContent,
  DropdownEntry,
  Dropdown,
} from "./Dropdown";

const AgeDropdown = ({ ranges, filterable, callback }) => {
  const [className, setClassName] = useState("none");
  /**
   * Reset the className on outside click.
   */
  AgeDropdown.handleClickOutside = () => {
    setClassName("none");
  };
  return (
    <Dropdown>
      <DropdownButton onClick={() => setClassName("active")}>
        Age Ranges
      </DropdownButton>
      <DropdownContent className={className}>
        {ranges.map((range, i) => (
          <>
            <DropdownEntry
              href="#"
              key={range}
              onClick={() => {
                setClassName("none");
                callback(filterable[i]);
              }}
            >
              {range}
            </DropdownEntry>
          </>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => AgeDropdown.handleClickOutside,
};

export default onClickOutside(AgeDropdown, clickOutsideConfig);
