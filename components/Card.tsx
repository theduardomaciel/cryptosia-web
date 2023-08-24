import React from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function Card({ icon, title, description }: Props) {
    return (
        <div className="w-full h-fit px-6 py-8 bg-white-200 border-primary-200 dark:border-gray-100 dark:bg-gray-200 rounded-[15px] flex-col justify-center items-start gap-[15px] inline-flex border border-transparent transition-colors hover:border-primary-200 hover:bg-primary-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <div className="justify-center items-center gap-2.5 inline-flex">
                {icon}
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <p className="self-stretch text-[var(--neutral)] text-[22px] font-black font-title leading-tight">
                    {title}
                </p>
                <p className="self-stretch text-[var(--neutral)] text-base font-normal font-serif">
                    {description}
                </p>
            </div>
        </div>
    );
}
