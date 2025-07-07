import Button from "@/app/ui/button";
import images from "@/public/images";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    return (
    <div className={`md:px-[8%] relative mt-12 mb-20 md:mt-32 md:mb-20`}>
      <div className="md:h-[264px] h-fit w-full md:py-0 py-8 bg-gradient-to-r from-[#0F2B22] to-[#FFD700]/80 flex items-center md: gap-12 md:px-16 px-4 md:rounded-3xl ">
        <div className=" md:block hidden -translate-y-[48px]">
            <Image src={images.man} alt="man" />
        </div>
        <div className="flex w-full md:w-1/2 flex-col gap-2">
          <h3 className="text-xl md:text-2xl text-white md:px-0 px-8 md:text-start text-center font-bold">
            Have a Question? We're Here to Help!
          </h3>
          <p className="text-white md:text-sm text-xs md:mt-0 mt-2 md:text-start text-center ">
          Got inquiries about our products, orders, or anything else? Reach out to our team and we'll assist you with the right answers. Whether you're shopping for men's fashion, women's wear, or kids' gadgets, we're always ready to help you make the best choice.
          </p>
          <Link href="/contact">
            <Button className="w-full mt-4">
                Make Enquiry
            </Button>
          </Link>
        </div>
      </div>
    </div>
    )
}