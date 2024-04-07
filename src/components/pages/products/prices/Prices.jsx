import React, { useEffect, useState } from "react";
import "./prices.css";
import { BackArrow } from "../../../backbutton/BackArrow";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStyles,
  updatePrices,
} from "../../../../store/slices/beerStyles/thunks";

export const Prices = () => {
  const { styles } = useSelector((state) => state.styles);
  const dispatch = useDispatch();
  const [pricesToChange, setPricesToChange] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (!styles?.length) {
      dispatch(getAllStyles());
    }
  }, []);

  useEffect(() => {
    setDisableButton(false);
  }, [styles]);

  const changePrice = (event) => {
    const price = pricesToChange.filter(
      (item) => item._id !== event.target.name
    );
    setPricesToChange([
      ...price,
      { _id: event.target.name, price: event.target.value },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePrices(pricesToChange));
    console.log(e);
    for (const target of e.target) {
      target.value = undefined;
    }
    setDisableButton(true);
  };

  return (
    <div className="prices_container">
      <BackArrow />
      <div className="boxPrices_container">
        <h2 className="titlePrice">Prices</h2>
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <div>
            {styles.map((style) => {
              return (
                <Grid key={style._id} container style={{ margin: "1rem" }}>
                  <Grid item xs={4} className="priceItem">
                    Style: <b>{style.name}</b>
                  </Grid>
                  <Grid item xs={4} className="priceItem">
                    Price: $ <b>{style.price}</b>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id={style._id}
                      label="Enter new Price"
                      variant="outlined"
                      type="number"
                      size="small"
                      onChange={changePrice}
                      name={style._id}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </div>
          <div className="button_container">
            <Button variant="contained" type="submit" disabled={disableButton}>
              update Prices
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};
