
import React from "react";
import CategorySection from "./CategorySection";
import { CategoryItemMen } from "@/app/components/models/Category";

const Category: React.FC = () => {
   
    return (
       <section>
        <CategorySection sectionTitle="Shop by Category" categoryItem={CategoryItemMen} />
       </section>
    )
}
export default Category;

