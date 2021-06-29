import React, { FC } from "react";
import { useAutoCompleteContext } from "../autoCompleteContext";

interface ListProps {
  empty?: string;
}

export const List: FC<ListProps> = () => {
  const isHighlighted = (id: number) => id === highlightedIndex;

  const { isOpen, highlightedIndex, filteredOptions, handleOnSelect } =
    useAutoCompleteContext();

  return (
    <>
      {isOpen && (
        <div className="dropdown-content">
          {filteredOptions?.map(({ id, value }, _index) => (
            <option
              className={
                isHighlighted(id) ? "highlighted-item" : "dropdown-item"
              }
              key={id}
              value={value}
              onClick={(e) => handleOnSelect(e, { id, value })}
            >
              {value}
            </option>
          ))}
        </div>
      )}
    </>
  );
};
