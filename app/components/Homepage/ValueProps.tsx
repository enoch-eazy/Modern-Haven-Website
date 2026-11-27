import { HiOutlineChatBubbleLeftRight, HiOutlineClipboardDocumentCheck, HiOutlineDevicePhoneMobile, HiOutlineTruck } from "react-icons/hi2";
import { sectionPadding } from "@/app/styles/styles";

const items = [
    { icon: HiOutlineDevicePhoneMobile, title: "Gadgets + fashion", text: "Tech and clothing in a single cart" },
    { icon: HiOutlineTruck, title: "Lagos delivery", text: "Fees shown upfront by landmark" },
    { icon: HiOutlineClipboardDocumentCheck, title: "Track your orders", text: "See every order's status online" },
    { icon: HiOutlineChatBubbleLeftRight, title: "Real people", text: "Questions? Call or email us" },
];

export default function ValueProps() {
    return (
        <section aria-label="Why shop with us" className="border-b border-gray-200 bg-white">
            <ul className={`${sectionPadding} grid grid-cols-2 gap-6 py-8 lg:grid-cols-4`}>
                {items.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex items-start gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                            <Icon className="size-6" />
                        </span>
                        <div>
                            <p className="font-semibold text-gray-900">{title}</p>
                            <p className="text-sm text-gray-600">{text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
