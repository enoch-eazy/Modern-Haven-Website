import EditShopForm from "@/app/components/shared/EditTopicform";
import axios from "axios";

const getShopById = async (id: any) => {
    try {
        const res = await fetch(`http://localhost:3000/api/shops/${id}`, {
            cache: "no-cache"
        });
        if(!res.ok) {
            throw new Error("Failed to fetch Shops.");
        }
        return res.json();
        // const res = await axios.get(`http://localhost:3000/api/shops/${id}`);
    } catch (error) {
        console.log(error);
    }
}
export default async function WomenShop( { params }: { params: { id: number } }) {
    const { id } = await params;
    const { shop } = await getShopById(id);
    const {title, description, price} = shop
    return (
        <EditShopForm id={id} title={title} description={description} price={price}/>
    )
}