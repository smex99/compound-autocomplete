import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useRef,
  MouseEvent,
  FocusEvent,
  ChangeEvent,
} from "react";

import { List } from "./components/List";
import { Field } from "./components/Field";
import { IOption, OptionsType } from "./types";
import { AutoCompleteProvider } from "./autoCompleteContext";

interface AutoCompleteProps {
  type: string;
  style?: any;
  defaultValue?: string;
  placeholder: string;
  isDisabled?: boolean;
  required?: boolean;
  options: OptionsType;
  empty?: string;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [initialOptions, setInitialOptions] = useState<OptionsType>([]);
  const [filteredOptions, setFilteredOptions] = useState<OptionsType>([]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) console.log("first render");
    else firstRender.current = false;

    const { isDisabled } = props;
    if (isDisabled) setIsOpen(false);
    else {
      setInitialOptions(memoizedSortedList);
      setFilteredOptions(memoizedSortedList);
    }
  }, []);

  const filterOptions = (value: string, options: OptionsType) => {
    if (value === undefined || value === null) return options;
    if (value.length === 0) {
      setSelected("");
      return options;
    }
    const normalizedValue = value.trim().toLowerCase();
    const filteredList = options.filter((item) =>
      item.value.trim().toLowerCase().includes(normalizedValue)
    );

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

  const memoizedSortedList = useMemo(
    () => sortOptionsList(props.options),
    [props]
  );

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      selected,
      initialOptions,
      filteredOptions,
      highlightedIndex,
    }),
    [isOpen, selected, initialOptions, filteredOptions, highlightedIndex]
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

  return (
    <AutoCompleteProvider
      value={{
        ...value,
        handleOnFocus,
        handleOnSelect,
        handleOnChange,
      }}
    >
      <div className="autocomplete">
        <Field value={inputValue} isDisablad={false} type="search" />
        <List empty={props.empty} />
      </div>
    </AutoCompleteProvider>
  );
};

export { AutoComplete };
