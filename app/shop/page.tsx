import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { sectionPadding } from "../styles/styles";
import KidsShop from "./kids/page";


export default function ShopPage() {
    return (
        <main className={`${sectionPadding} mx-auto py-4 mt-20 w-1/2`}>
           <div className="flex justify-between items-center mx-auto bg-[#0F2B22] p-2">
                <Link href={"/"} className="cursor-pointer">
                    <Image src={images.logo} alt="Logo" className="w-14 h-14 invert"/>
                </Link>
                <Link href={"/shop/men"}>
                    <Button >
                        Add Shop
                    </Button>
                </Link>
           </div>
           <div>
                <KidsShop />
           </div>
        </main>
    )
}