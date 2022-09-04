const filterFunction = (input, data) => {
  const filteredData = data.filter(
    (item) => item.name.toLowerCase() === input.toLowerCase()
  );
  return filteredData;
};

export { filterFunction };
