import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  MouseEvent,
  FocusEvent,
  ChangeEvent,
  KeyboardEvent
} from "react";

import { SelectList } from "./SelectList";

interface AutoCompleteProps {
  type: string;
  style?: any;
  defaultValue?: string;
  placeholder: string;
  isDisabled?: boolean;
  required?: boolean;
  options: Array<any>;
}

export interface IOption {
  id: number;
  value: string;
}

export type OptionsType = Array<IOption>;

export const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
      null
    );
    const [initialOptions, setInitialOptions] = useState<OptionsType>([]);
    const [filteredOptions, setFilteredOptions] = useState<OptionsType>([]);

    useEffect(() => {
      const { options, isDisabled } = props;
      if (isDisabled) setIsOpen(false);
      else {
        setInitialOptions(options);
        setFilteredOptions(options);
      }
    }, [props]);

    // TODO: Optimize the filter function because it is expensive and avoid renders
    const filterOptions = (
      value: string,
      options: OptionsType
    ): OptionsType => {
      if (typeof value === "undefined" || value === null) return;

      if (value.length === 0) {
        setSelected("");
        return initialOptions;
      }

      const normalizedValue = value.trim().toLowerCase();
      const filteredList = options.filter((item) =>
        item.value.trim().toLowerCase().includes(normalizedValue)
      );

      // setHighlightedIndex(filteredList[0].id);

      return filteredList;
    };

    const sortOptionsList = (options: OptionsType): OptionsType => {
      const orderedList = options.sort((a, b) => {
        var nameA = a.value.toUpperCase();
        var nameB = b.value.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      return orderedList;
    };

    // Memoize the result avoid expensive calculations.
    const memoizedSortedList = useMemo(() => sortOptionsList(filteredOptions), [
      filteredOptions
    ]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value: string = e.target.value;

      setInputValue(value);
      setFilteredOptions(filterOptions(value, initialOptions));
    };

    const handleOnFocus = (_e: FocusEvent<HTMLInputElement>) => {
      setIsOpen(true);
      if (selected.length === 0) return;
      setFilteredOptions(filterOptions(selected, initialOptions));
    };

    const handleOnSelect = (
      _e: MouseEvent<HTMLOptionElement>,
      selectedOption: IOption
    ) => {
      const { value, id } = selectedOption;
      setIsOpen(false);
      setSelected(value);
      setInputValue(value);
      setHighlightedIndex(id);
    };

    // TODO: find better way to handle input onBlur event.
    const handleOnBlur = () => {};

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // handle key up
      if (e.key === "ArrowUp ") {
        // setSelected(filterOptions[])
      }
      // handle key down
      if (e.key === "ArrowDown ") {
      }
      // handle key enter
      if (e.key === "Enter") {
      }
    };

    const { placeholder, type = "search", style, isDisabled = false } = props;

    return (
      <div className="autocomplete">
        <input
          ref={ref}
          type={type}
          style={style}
          value={inputValue}
          disabled={isDisabled}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        {isOpen && (
          <SelectList
            highlightedIndex={highlightedIndex}
            filtered0ptions={memoizedSortedList}
            onSelect={handleOnSelect}
          />
        )}
      </div>
    );
  }
);
