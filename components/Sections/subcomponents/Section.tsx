"use client";
import clsx from "clsx";
import { useSearchParams, useRouter } from "next/navigation";

interface SectionProps {
    id: string;
    name: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function Section({
    id,
    name,
    icon,
    children,
    className,
}: SectionProps) {
    const router = useRouter();

    const searchParams = useSearchParams();
    const currentSection = searchParams?.get("app");
    const isExpanded =
        currentSection == id || (!currentSection && id == "public-key");

    // O uso da tag !important (! no tailwind) é necessário para sobrescrever o "lg:max-w-fit" quando houver animação, visto que já existe um valor definido para o mesmo na versão mobile

    // Gambiarra: o valor 50rem no atual "lg:!max-w-[75vw]" faz a animação funcionar sem nenhum travamento, no entanto, o valor 50rem é menor que o tamanho da tela, fazendo com que o conteúdo não ocupe todo o tamanho.

    // Para alterar o tamanho do "header" da seção, altere o valor do "lg:w-48" para o tamanho desejado, e o valor do "lg:!max-w-[12rem]" para o tamanho desejado (o equivalente ao tamanho no tailwind)
    return (
        <li
            className={clsx(
                "flex flex-col lg:flex-row group aria-expanded:hover:bg-primary-200 aria-expanded:dark:hover:bg-gray-100 bg-white-200 dark:bg-gray-200 w-full lg:max-w-fit lg:h-96 overflow-hidden ease-in-out flex-grow lg:transition-[max-width] lg:duration-700",
                {
                    "lg:!max-w-[calc(100vw-24em-var(--wrapper)*2)]": isExpanded,
                    "lg:!max-w-[12rem]": !isExpanded,
                },
                className
            )}
            aria-expanded={!isExpanded}
        >
            {/* Header */}
            <div
                className="group-aria-expanded:cursor-pointer transition flex flex-row px-5 items-center lg:items-end justify-between lg:w-48 py-5 gap-x-3"
                onClick={
                    () => router.replace(`?app=${id}`, { scroll: false })
                    /* isExpanded
                        ? router.replace("/", { scroll: false })
                        : router.replace(`?app=${id}`, { scroll: false }) */
                }
            >
                <div className="flex flex-row flex-wrap items-center justify-start gap-x-6">
                    {icon}
                    <p className="text-text-100 font-bold font-title leading-tight text-2xl break-words overflow-ellipsis">
                        {name}
                    </p>
                </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                <div
                    className={clsx(
                        "pt-0 w-full lg:min-w-[calc(100vw-36rem-var(--wrapper)*2)] transition-[max-height,opacity] duration-700 bg-primary-100 dark:bg-primary-200",
                        {
                            "max-lg:max-h-[50rem]": isExpanded,
                            "max-lg:max-h-0": !isExpanded,
                        }
                    )}
                >
                    {children && children}
                </div>
            </div>
        </li>
    );
}
