import Link from "next/link";

// Icons
import Logo from "@/public/Logo";
import { AccessibilityIcon } from "@radix-ui/react-icons";

export default function Header() {
    return (
        <div className="w-full bg-white-200 dark:bg-stone-900 rounded-[25px] justify-between items-center gap-2.5 mt-6 px-10 py-6 inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
                <Logo />
            </div>
            <Link href={"/accessibility"} scroll={false}>
                <AccessibilityIcon
                    width={`1.25rem`}
                    height={`1.25rem`}
                    className="text-black dark:text-[var(--neutral)] cursor-pointer"
                />
            </Link>
        </div>
    );
}
