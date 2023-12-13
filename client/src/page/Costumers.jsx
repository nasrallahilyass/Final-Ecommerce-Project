import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts, deleteProduct } from "../app/reducers/ProductsSlice";
import { Table1 } from "../components/Table";
import {CostumerColumns} from "../utils/TableColumns"
import { Link } from 'react-router-dom';
const pcolumns =CostumerColumns
export default function Costumer() {
    const handleDeleteProduct = async () => {     
      };
   const products= [
    {
      "_id": {"$oid": "6545018ca0677ff6c727c9d7"},
      "first_name": "ibtisame",
      "last_name": "arkx",
      "email": "ibtisame@gmail.com",
      "password": "$argon2id$v=19$m=65536,t=3,p=4$d3iod657ON7G48PJbXAirQ$iZyHYoXeA+MzItGNUs3VAv2w9yomWbGp3vW9cT6R7/k",
      "valid_account": false,
      "creation_date": {"$date": 1699021196237}
    },
    {
      "_id": {"$oid": "6554d0108581e68ab1499d4b"},
      "first_name": "user",
      "last_name": "user",
      "email": "user1@gmail.com",
      "password": "$argon2id$v=19$m=65536,t=3,p=4$8oyvfiQrlCkgBvl3xkI5bg$1+qoZEESvcLxmgpOU/BDltHcSM60ofxhMiN9419uVGE",
      "valid_account": false,
      "role": "customer",
      "creation_date": {"$date": 1700057104990}
    }
  ]
  
  return (
    <div className="flex flex-col overflow-auto py-4 sm:py-0">    
        <Table1 data={products} handleActionsProductClick={handleDeleteProduct} columns={pcolumns} />
    </div>
  );
}

