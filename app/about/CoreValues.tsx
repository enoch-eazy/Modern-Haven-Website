import { sectionPadding } from "../styles/styles";
import { Icons } from "../ui/icons";

export default function CoreValues() {
    const CoreValues = [
        {
            name: "Integrity",
            description: "We are committed to honest, transparent service, offering products you can trust.",
            Icon: <Icons.Phone />
        },
        {
            name: "Excellence",
            description: "We deliver quality fashion and lifestyle essentials designed to elevate your everyday life.",
            Icon: <Icons.Phone />
        },
        {
            name: "Customer-Centered",
            description: "Your style and comfort come first. Every product is thoughtfully chosen with your needs in mind..",
            Icon: <Icons.Phone />
        },
        {
            name: "Family-Focused Impact",
            description: "We aim to bring style and joy to families everywhere, creating moments of connection through fashion and gadgets.",
            Icon: <Icons.Phone />
        },
        {
            name: "Innovation",
            description: "We stay ahead of trends and technology to bring you modern styles and gadgets that fit your lifestyle.",
            Icon: <Icons.Phone />
        },
    ]
    return (
        <section className={`${sectionPadding} bg-white py-4`}>
            <h1 className="text-2xl font-bold text-center text-[#0F2B22] mt-4" >
                Modern Haven Fashion Core Values
            </h1>
            <p className="mx-auto w-full md:w-[550px] text-gray-500 text-sm md:text-base mb-8 text-center">
            Our core values shape our dedication to creating exceptional fashion and lifestyle experiences for every family.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">  
                {CoreValues.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-center w-full h-[200px] flex flex-col space-y-4 p-5 bg-[#0F2B22] shadow-[#0F2B22] hover:shadow-2xl rounded-md transition-all duration-300">
                        <span className="mx-auto">
                            {item.Icon}
                        </span>
                        <h2 className="md:text-2xl text-xl font-bold">
                            {item.name}
                        </h2>
                        <p className="md:text-sm text-gray-600">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-4 text-white">
            {CoreValues.slice(3, 5).map((item, index) => (
                    <div key={index} className="text-center w-full md:w-[350px] h-[200px] flex flex-col items-center space-y-4 p-5 bg-[#0F2B22] shadow-[#0F2B22] hover:shadow-2xl rounded-md transition-all duration-300">
                        <span className="mx-auto">
                            {item.Icon}
                        </span>
                        <h2 className=" font-bold">
                            {item.name}
                        </h2>
                        <p className="md:text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

        </section>
    )
}