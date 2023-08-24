import Logo from "@/public/Logo";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full bg-stone-900 rounded-[25px] justify-between items-center gap-2.5 mt-6 px-10 py-6 inline-flex">
            <div className="justify-center items-center gap-2.5 flex">
                <Logo />
            </div>
            <Link
                href={"https://github.com/theduardomaciel/cc-md"}
                target="_blank"
            >
                <GitHubLogoIcon
                    width={`1.25rem`}
                    height={`1.25rem`}
                    className="text-black dark:text-white cursor-pointer"
                />
            </Link>
        </div>
    );
}
