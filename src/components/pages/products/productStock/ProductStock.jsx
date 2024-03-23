import React, { useEffect } from "react";
import "./productStock.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../../../../store/slices/beerStyles/thunks";
import { getAllBarrels } from "../../../../store/slices/barrels/thunks";
import { Table } from "../../../table/Table";

export const ProductStock = () => {
  const dispatch = useDispatch();
  const { styles } = useSelector((state) => state.styles);
  const { barrels } = useSelector((state) => state.barrels);

  useEffect(() => {
    if (!styles.length) {
      dispatch(getAllStyles());
    }
    if (!barrels.length) {
      dispatch(getAllBarrels());
    }
  }, []);

  const columns = [
    {
      field: "style",
      headerName: "Style",
      width: 200,
      hideable: false,
    },
    {
      field: "fifty",
      headerName: "50 Liters",
      type: "number",
      width: 150,
    },
    {
      field: "thirty",
      headerName: "30 Liters",
      type: "number",
      width: 150,
    },
    {
      field: "twenty",
      headerName: "20 Liters",
      type: "number",
      width: 150,
    },
    {
      field: "ten",
      headerName: "10 Liters",
      type: "number",
      width: 150,
    },
    {
      field: "five",
      headerName: "5 Liters",
      type: "number",
      width: 150,
    },
  ];

  const rows = styles.map((style) => {
    return {
      _id: style._id,
      style: style.name,
      fifty: barrels.filter(
        (barrel) =>
          barrel.statusBarrel === "full in factory" &&
          barrel.capacity === 50 &&
          barrel.style._id === style._id
      ).length,
      thirty: barrels.filter(
        (barrel) =>
          barrel.statusBarrel === "full in factory" &&
          barrel.capacity === 30 &&
          barrel.style._id === style._id
      ).length,
      twenty: barrels.filter(
        (barrel) =>
          barrel.statusBarrel === "full in factory" &&
          barrel.capacity === 20 &&
          barrel.style._id === style._id
      ).length,
      ten: barrels.filter(
        (barrel) =>
          barrel.statusBarrel === "full in factory" &&
          barrel.capacity === 10 &&
          barrel.style._id === style._id
      ).length,
      five: barrels.filter(
        (barrel) =>
          barrel.statusBarrel === "full in factory" &&
          barrel.capacity === 5 &&
          barrel.style._id === style._id
      ).length,
    };
  });

  return (
    <div className="productStock_container">
      <BackArrow />
      <Table columns={columns} rows={rows} />
    </div>
  );
};
