
import React from "react";
import CategorySection from "./CategorySection";
import { CategoryItem } from "@/app/components/models/Category";
import { easeInOut, motion } from "framer-motion";

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

