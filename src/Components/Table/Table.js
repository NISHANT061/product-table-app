import React, { useEffect, useState } from "react";
import {
  formatNumber,
  mergeArray,
  searchData,
} from "../../utils/genricFunctions";

const ProductTable = () => {
  const [tableData, setTableData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading,setLoading] = useState(true)

  const [total, setTotal] = useState(0);
  useEffect(() => {
    const promises = [
      fetch("./api/branch1.json").then((res) => res.json()),
      fetch("./api/branch2.json").then((res) => res.json()),
      fetch("./api/branch3.json").then((res) => res.json()),
    ];
    Promise.all(promises).then((value) => {
        setLoading(false)
      const sortedData = mergeArray(value.map((item) => item.products));
      setTableData(sortedData.data);
      setOriginalData(sortedData.data);
      setTotal(sortedData.total);
    });
  }, []);
  const searchInTable = (event) => {
    const value = event.target.value;
    const sortedData = searchData(value, originalData);
    setTableData(sortedData.data);
    setTotal(sortedData.total);
  };
  return (
    !loading?<div className="product-list">
      <label>Search Products</label>
      <input type="text" onChange={(event) => searchInTable(event)} />

     <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{formatNumber(item.sold)}</td>
              </tr>
            ))}
          {tableData && tableData.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                No Matching data found
              </td>
            </tr>
          ) : null}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>:"Loading..."
  );
};

export default ProductTable;
