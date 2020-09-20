//format number function
export const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
// sort function
export const sort = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

//merging array 
export const mergeArray = (parentArray) => {
  const intermediateObject = {};
  for (let i = 0; i < parentArray.length; i++) {
    parentArray[i].map((item) => {
      if (Object.keys(intermediateObject).includes(item.name)) {
        intermediateObject[item.name] =
          item.sold + intermediateObject[item.name];
      } else {
        intermediateObject[item.name] = item.sold;
      }
    });
  }
  let data = Object.keys(intermediateObject).map((key) => ({
    sold: intermediateObject[key],
    name: key,
  }));
  let total = data.reduce((prev, curr) => {
    return prev + curr.sold;
  }, 0);
  return { data: data.sort((a, b) => sort(a, b)), total: formatNumber(total) };
};

//search in table
export const searchData = (valueToSearch,dataToSearch) => {
  let data = dataToSearch
  if(valueToSearch !== ''){
     data = dataToSearch.filter((item) => {
      if (item.name.toLowerCase().search(valueToSearch.toLowerCase()) !== -1) {
        return item;
      }
    });
  }
  let total = data.reduce((prev, curr) => {
    return prev + curr.sold;
  }, 0);
  return { data: data.sort((a, b) => sort(a, b)), total: formatNumber(total) };
};
