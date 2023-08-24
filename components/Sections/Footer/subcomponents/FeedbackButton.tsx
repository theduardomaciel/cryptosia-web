import Link from "next/link";
import { cn } from "@/lib/utils";

import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface Props {
    className?: string;
}

export default function FeedbackButton({ className }: Props) {
    return (
        <Link
            className={cn(
                "flex flex-row items-center justify-center px-4 py-2.5 gap-x-2.5 bg-transparent text-text-100 font-medium text-sm border border-gray-400 dark:border-dark-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-dark-gray-200 transition-colors w-full shadow-sm",
                className
            )}
            href={`/feedback`}
        >
            <PaperPlaneIcon width={16} height={16} />
            Compartilhar feedback
        </Link>
    );
}
