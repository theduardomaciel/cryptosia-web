"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../../ui/Button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface Props {
    query: {
        key: string;
        value: number;
    };
    children?: React.ReactNode;
}

export default function SectionButton({ query, children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const currentSubsection = searchParams.get("subsection");

    return (
        <div className="flex flex-row items-center justify-between w-full transition-all">
            <div
                className={clsx(
                    "flex items-center justify-center w-1/6 overflow-hidden ease-in-out flex-grow max-w-[0px] transition-all duration-500",
                    {
                        "!max-w-[10%] mr-2.5":
                            currentSubsection &&
                            parseInt(currentSubsection) > 0,
                    }
                )}
            >
                <Button
                    className="flex flex-1"
                    onClick={() =>
                        router.push(
                            pathname +
                                "?" +
                                createQueryString(
                                    query.key,
                                    (query.value - 2).toString()
                                ),
                            { scroll: false }
                        )
                    }
                >
                    <ArrowLeftIcon width={24} height={24} color="white" />
                </Button>
            </div>
            <Button
                onClick={() =>
                    router.replace(
                        pathname +
                            "?" +
                            createQueryString(
                                query.key,
                                query.value.toString()
                            ),
                        { scroll: false }
                    )
                }
            >
                {children}
            </Button>
        </div>
    );
}
