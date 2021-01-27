import React, { useContext } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import SearchBar from "./SearchBar";

const DropdownMenu = ({ name, list, filterable, callback }) => {
  const { appState, dispatch } = useContext(AppContext);
  return (
    <>
      <button>{name}</button>
      {list.map((item, i) => (
        <a href="#" key={item} onClick={() => callback(filterable[i])}>
          {item}
        </a>
      ))}
    </>
  );
};

export default DropdownMenu;
