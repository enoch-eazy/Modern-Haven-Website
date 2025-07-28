
import React from "react";
import CategorySection from "./CategorySection";
import { CategoryItem } from "@/app/components/models/Category";


const Category: React.FC = () => {
    return (
        <>
       <section>
        <CategorySection sectionTitle="Shop by Category" categoryItem={CategoryItem} />
       </section>
      
       </>
    )
}
export default Category;

