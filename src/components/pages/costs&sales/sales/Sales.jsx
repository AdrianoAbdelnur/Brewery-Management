import React, { useEffect, useState } from "react";
import "./sales.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales } from "../../../../store/slices/sales/thunks";
import { Table } from "../../../table/Table";
import { format } from "date-fns";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { ModifyPriceModal } from "../../../modals/ModifyPriceModal";

export const Sales = () => {
  const { sales } = useSelector((state) => state.sales);
  const dispatch = useDispatch();
  const [showModifyPricesModal, setShowModifyPricesModal] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    if (!sales.length) {
      dispatch(getAllSales());
    }
  }, []);

  const handleClose = () => {
    setShowModifyPricesModal(false);
  };

  const openModal = (id) => {
    setId(id);
    setShowModifyPricesModal(true);
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      editable: true,
      width: 80,
      hideable: false,
    },
    {
      field: "date",
      headerName: "Date",
      editable: true,
      width: 150,
      hideable: false,
    },
    {
      field: "style",
      headerName: "Style",
      editable: true,
      width: 150,
    },
    {
      field: "volume",
      headerName: "Volume",
      editable: true,
      width: 100,
    },
    {
      field: "customer",
      headerName: "Customer",
      editable: true,
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      editable: true,
      width: 80,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Edit Price",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon color="primary" />}
            label="Edit"
            className="textPrimary"
            onClick={() => openModal(id)}
            color="primary"
          />,
        ];
      },
    },
    {
      field: "paid",
      headerName: "Paid",
      editable: true,
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      width: 200,
    },
  ];

  const rows = sales.map((sale, index) => {
    return {
      _id: sale._id,
      index: index + 1,
      date: format(sale.date, "dd-MM-yyyy"),
      style: sale.style.name,
      volume: sale.volume,
      customer: sale.customer.barName,
      price: sale.price,
      paid: sale.paid,
      status: sale.price - sale.paid == 0 ? "Complete" : "Pending",
    };
  });

  return (
    <div className="sales_container">
      <BackArrow />
      <Table columns={columns} rows={rows} />
      <ModifyPriceModal
        show={showModifyPricesModal}
        handleClose={handleClose}
        id={id}
        item={sales.filter((sale) => sale._id == id)[0]}
      />
    </div>
  );
};
