import { OptionsType } from "./types";

const filterOptions = (value: string, options: OptionsType) => {
  if (typeof value === "undefined" || value === null) return options;

  if (value.length === 0) return options;

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

export { filterOptions, sortOptionsList };
