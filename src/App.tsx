import React, { useRef, useEffect, FormEventHandler } from "react";
import { AutoComplete } from "./AutoComplete";
import "./styles.css";

const options = [
  { id: 1, value: "Canada" },
  { id: 2, value: "Morocco" },
  { id: 3, value: "Algeria" },
  { id: 4, value: "Russia" },
  { id: 5, value: "France" },
  { id: 6, value: "Brazil" },
  { id: 7, value: "India" },
  { id: 8, value: "United States" },
  { id: 9, value: "Afghanistan" }
];

export default function App() {
  const inputEl = useRef(null);

  useEffect(() => {
    // inputEl?.current?.focus();
  }, []);

  const handleOnSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(inputEl?.current?.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <AutoComplete
          ref={inputEl}
          type="search"
          placeholder="Choose a country"
          options={options}
          // isDisabled={true}
        />

        <hr />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
