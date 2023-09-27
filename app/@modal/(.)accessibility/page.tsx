"use client";

import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import {
    MouseEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

export default function Accessibility() {
    const overlay = useRef(null);
    const wrapper = useRef(null);

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [disableTypingAnimation, setDisableTypingAnimation] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    const onDismiss = useCallback(() => {
        setIsModalOpen(false);
        if (reduceMotion) {
            router.back();
        } else {
            setTimeout(() => {
                router.back();
            }, 500);
        }
    }, [router, reduceMotion]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay]
    );

    const onToggleTypingAnimation = useCallback(() => {
        //const html = document.querySelector("html") as HTMLElement;
        //html.classList.remove("disable-typing-animation");

        if (localStorage.getItem("disable-typing-animation") === "true") {
            console.log("Ativando animação de digitação...");
            localStorage.setItem("disable-typing-animation", "false");
            setDisableTypingAnimation(false);
        } else {
            console.log("Desativando animação de digitação...");
            localStorage.setItem("disable-typing-animation", "true");
            setDisableTypingAnimation(true);
        }
    }, []);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onDismiss();
        },
        [onDismiss]
    );

    useEffect(() => {
        const isReduced =
            window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ===
            true;

        if (!!isReduced) {
            setReduceMotion(true);
            setIsModalOpen(true);
        } else {
            setTimeout(() => {
                setIsModalOpen(true);
            }, 25);
        }

        const disableTypingAnimation =
            localStorage.getItem("disable-typing-animation") === "true";

        setDisableTypingAnimation(disableTypingAnimation);

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            className={cn(
                "fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-black/60 motion-safe:transition-opacity duration-500 z-10",
                {
                    "opacity-0": !isModalOpen && !reduceMotion,
                    "opacity-100": isModalOpen,
                    "transition-none transform-none":
                        isModalOpen && reduceMotion,
                }
            )}
            onClick={onClick}
            ref={overlay}
        >
            <div
                className={cn(
                    "flex flex-col items-center justify-start z-20 bg-white-100 dark:bg-gray-200 rounded-md p-14 gap-12 min-h-[25rem] w-[80vw] lg:max-w-[30rem] transition-transform duration-500",
                    {
                        "translate-y-[50vh]": !isModalOpen && !reduceMotion,
                        "translate-y-0": isModalOpen,
                        "transition-none transform-none":
                            isModalOpen && reduceMotion,
                    }
                )}
                ref={wrapper}
            >
                <div className="flex flex-col items-center justify-start gap-3 w-full relative">
                    <AccessibilityIcon />
                    <h3 className="text-[var(--neutral)] font-black font-title text-center text-3xl">
                        Acessibilidade
                    </h3>
                    <Cross1Icon
                        width={18}
                        height={18}
                        color="var(--neutral)"
                        className="absolute top-0 right-0 opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                        onClick={onDismiss}
                    />
                </div>

                <div className="flex flex-row items-center justify-between flex-wrap gap-2 w-full">
                    <span>Remover animação de digitação</span>
                    <Switch
                        onCheckedChange={onToggleTypingAnimation}
                        checked={disableTypingAnimation}
                    />
                </div>

                <div className="flex flex-row items-center justify-between flex-wrap gap-2 w-full">
                    <span>Reduzir animações</span>
                    <Switch checked={reduceMotion} disabled />
                </div>

                <p className="text-center opacity-40">
                    A preferência de redução de animações deve ser alterada nas
                    configurações do seu dispositivo.
                </p>
            </div>
        </div>
    );
}

function AccessibilityIcon({ className }: { className?: string }) {
    return (
        <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <mask
                id="mask0_258_501"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="33"
                height="32"
            >
                <rect x="0.5" width="32" height="32" fill="#FFFFFF" />
            </mask>
            <g mask="url(#mask0_258_501)">
                <path
                    d="M16.5 8.00002C15.7667 8.00002 15.1389 7.73891 14.6167 7.21669C14.0944 6.69446 13.8333 6.06669 13.8333 5.33335C13.8333 4.60002 14.0944 3.97224 14.6167 3.45002C15.1389 2.9278 15.7667 2.66669 16.5 2.66669C17.2333 2.66669 17.8611 2.9278 18.3833 3.45002C18.9056 3.97224 19.1667 4.60002 19.1667 5.33335C19.1667 6.06669 18.9056 6.69446 18.3833 7.21669C17.8611 7.73891 17.2333 8.00002 16.5 8.00002ZM12.5 28V12H5.83333C5.45556 12 5.13889 11.8722 4.88333 11.6167C4.62778 11.3611 4.5 11.0445 4.5 10.6667C4.5 10.2889 4.62778 9.97224 4.88333 9.71669C5.13889 9.46113 5.45556 9.33335 5.83333 9.33335H27.1667C27.5444 9.33335 27.8611 9.46113 28.1167 9.71669C28.3722 9.97224 28.5 10.2889 28.5 10.6667C28.5 11.0445 28.3722 11.3611 28.1167 11.6167C27.8611 11.8722 27.5444 12 27.1667 12H20.5V28C20.5 28.3778 20.3722 28.6945 20.1167 28.95C19.8611 29.2056 19.5444 29.3334 19.1667 29.3334C18.7889 29.3334 18.4722 29.2056 18.2167 28.95C17.9611 28.6945 17.8333 28.3778 17.8333 28V21.3334H15.1667V28C15.1667 28.3778 15.0389 28.6945 14.7833 28.95C14.5278 29.2056 14.2111 29.3334 13.8333 29.3334C13.4556 29.3334 13.1389 29.2056 12.8833 28.95C12.6278 28.6945 12.5 28.3778 12.5 28Z"
                    fill="var(--neutral)"
                />
            </g>
        </svg>
    );
}
