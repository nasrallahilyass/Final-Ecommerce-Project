import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSubcategories, deletesubcategorie} from "../app/reducers/subcategorieSlice";
import { Table1 } from "../components/Table";
import {SubcategoryColumns} from "../utils/TableColumns"
const Scolumns =SubcategoryColumns
export default function Subcategories() {
  const dispatch = useDispatch();
  const subcategories = useSelector((state) => state.subCategoriesList.subcategories);
  const status = useSelector((state) => state.subCategoriesList.status);

  useEffect(() => {
    console.log("Fetching subcategories...");
    dispatch(fetchAllSubcategories());
  }, []);
  const handleDeleteSubcategorie = async (subcategorieId) => {
    try {
      await dispatch(deletesubcategorie(subcategorieId));
      dispatch(fetchAllSubcategories());
      alert('subcategorie deleted succesfully')
    } catch (error) {
      console.error('Error subcategorie :', error);
    }
  };
 
  if (status === "pending") 
    return <p>Loading...</p>;

  if (status === "rejected")
    return <p>Error fetching subcategorie.</p>;
  
  console.log("subcategories:", subcategories ); // Log the response here

  return (
    <div className="flex flex-col overflow-auto py-4 sm:py-0">
        <Table1 data={subcategories} handleActionsProductClick={handleDeleteSubcategorie} columns={Scolumns} />
    </div>
  );
}

