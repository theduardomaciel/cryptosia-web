import { ReactNode } from "react";

export default function SectionWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-full bg-transparent flex-col items-start justify-start py-6 px-1 gap-4 lg:justify-center lg:gap-8 lg:py-16 lg:px-8">
            {children}
        </div>
    );
}
