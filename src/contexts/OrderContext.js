import React, { createContext, useContext, useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket } from "../models";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const createOrder = () => {
    console.warn("gshshs");
  };

  return (
    <React.Fragment>
      <OrderContext.Provider value={{ createOrder }}>
        {children}
      </OrderContext.Provider>
    </React.Fragment>
  );
};

export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext);
