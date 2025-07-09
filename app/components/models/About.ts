import Image, { StaticImageData } from "next/image";
import { sectionPadding } from "../../styles/styles";
import images from "@/public/images";

export interface AboutProps {
    sectionTitle: string;
    image: StaticImageData;
    paragraph1: string;
    paragraph2: string;
    order?: "left" | "right";
}

