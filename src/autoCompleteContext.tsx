import React, {
  ReactNode,
  Dispatch,
  FC,
  ChangeEvent,
  MouseEvent,
  FocusEvent,
} from "react";
import { IOption } from "./types";

interface IContext {
  isOpen: boolean;
  selected: string;
  initialOptions: any[];
  filteredOptions: any[];
  highlightedIndex: number | null;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  handleOnFocus: (e: FocusEvent<HTMLInputElement>) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSelect: (e: MouseEvent<HTMLOptionElement>, selected: IOption) => void;
}

interface AutoCompleteProps {
  children: ReactNode;
  value: IContext;
}

const AutoCompleteContext = React.createContext<IContext | undefined>(
  undefined
);

const AutoCompleteProvider: FC<AutoCompleteProps> = ({ children, value }) => {
  return (
    <AutoCompleteContext.Provider value={value}>
      {children}
    </AutoCompleteContext.Provider>
  );
};

const useAutoCompleteContext = () => {
  const context = React.useContext(AutoCompleteContext);

  if (context === undefined)
    throw new Error(
      "useAutoCompleteContext must be used within a AutoCompleteProvider"
    );
  return context;
};

export { AutoCompleteProvider, useAutoCompleteContext };
