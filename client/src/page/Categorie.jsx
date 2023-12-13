import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllcategories, deletecategorie} from "../app/reducers/CategorieSlice";
import { Table1 } from "../components/Table";
import {CategoryColumns} from "../utils/TableColumns"
import { Link } from 'react-router-dom';
const Catcolumns =CategoryColumns
export default function Categorie() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.CategoriesList.categories);
  const status = useSelector((state) => state.CategoriesList.status);

  useEffect(() => {
    console.log("Fetching categories...");
    dispatch(fetchAllcategories());
  }, []);
  const handleDeletecategorie = async (categorieId) => {
    try {
      await dispatch(deletecategorie(categorieId));
      dispatch(fetchAllcategories());
      alert('categorie deleted succesfully')
    } catch (error) {
      console.error('Error categorie :', error);
    }
  };
 
  if (status === "pending") 
    return <p>Loading...</p>;

  if (status === "rejected")
    return <p>Error fetching categories.</p>;
  
  console.log("categories:", categories ); // Log the response here

  return (
    <div className="flex flex-col overflow-auto py-4 sm:py-0">
      <Link to="/new-category">
      <button class="btn btn-sm">Create category</button>
      </Link> 
        <Table1 data={categories} handleActionsProductClick={handleDeletecategorie} columns={Catcolumns} />
    </div>
  );
}

