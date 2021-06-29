import React, { FC, MouseEvent } from "react";
import { OptionsType, IOption } from "./AutoComplete";

interface SelectListProps {
  isOpen?: boolean;
  filtered0ptions: OptionsType;
  highlightedIndex: number;
  onSelect: (e: MouseEvent<HTMLOptionElement>, item: IOption) => unknown;
}

export const SelectList: FC<SelectListProps> = ({
  highlightedIndex,
  filtered0ptions,
  onSelect
}) => {
  const isHighlighted = (id: number) => id === highlightedIndex;

  return (
    <div className="dropdown-content">
      {filtered0ptions?.map((item, _index) => (
        <option
          className={
            isHighlighted(item.id) ? "highlighted-item" : "dropdown-item"
          }
          key={item.id}
          value={item.value}
          onClick={(e) => onSelect(e, item)}
        >
          {item.value}
        </option>
      ))}
    </div>
  );
};
