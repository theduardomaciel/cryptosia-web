import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Icons
import { CheckIcon, CopyIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useId } from "react";

interface Props {
    isVisible: boolean;
    textareaId: string;
}

export default function ActionsHolder({ isVisible, textareaId }: Props) {
    const id = useId();

    return (
        <div
            className={cn(
                "flex flex-row items-center justify-end absolute bottom-0 right-0 translate-x-20 transition-transform",
                {
                    "translate-x-0": isVisible,
                }
            )}
        >
            <Button
                tabIndex={isVisible ? 0 : -1}
                id={`copy-message_${id}`}
                className={cn(
                    "flex flex-row items-center justify-start max-w-[2.5rem] h-10 outline-0 hover:outline-0 rounded-tr-none rounded-br-none rounded-bl-none overflow-x-hidden overflow-y-hidden transition-all duration-500 pl-3"
                )}
                onClick={() => {
                    const textarea = document.getElementById(
                        textareaId
                    ) as HTMLTextAreaElement;
                    if (!textarea)
                        return console.error(
                            `Textarea ou mensagem criptografada ausente`
                        );

                    textarea.select();

                    const button = document.getElementById(
                        `copy-message_${id}`
                    );

                    const message = textarea.value;
                    navigator.clipboard.writeText(message);

                    if (button) {
                        const copyIcon = document.getElementById(
                            `copy-message-icon_${id}`
                        );

                        const checkIcon = document.getElementById(
                            `copy-message-check-icon_${id}`
                        );

                        if (copyIcon && checkIcon) {
                            copyIcon.classList.add("scale-0");
                            copyIcon.classList.remove("scale-100");

                            checkIcon.classList.add("scale-100");
                            checkIcon.classList.remove("scale-0");
                        }

                        button.style.maxWidth = "100%";

                        setTimeout(() => {
                            button.style.maxWidth = "2.5rem";

                            if (copyIcon && checkIcon) {
                                copyIcon.classList.add("scale-100");
                                copyIcon.classList.remove("scale-0");

                                checkIcon.classList.add("scale-0");
                                checkIcon.classList.remove("scale-100");
                            }
                        }, 1000);
                    }
                }}
            >
                <div className="flex items-center justify-center min-w-[18px] relative">
                    <CopyIcon
                        id={`copy-message-icon_${id}`}
                        width={18}
                        height={18}
                        color="white"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  scale-100 transition-transform duration-500"
                    />
                    <CheckIcon
                        id={`copy-message-check-icon_${id}`}
                        width={18}
                        height={18}
                        color="white"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500"
                    />
                </div>
                <p>Copiado!</p>
            </Button>
            <Button
                tabIndex={isVisible ? 0 : -1}
                id="download-encrypted-message"
                className="w-10 min-w-[2.5rem] h-10 outline-0 hover:outline-0 rounded-tl-none rounded-bl-none rounded-tr-none"
                onClick={() => {
                    const textarea = document.getElementById(
                        textareaId
                    ) as HTMLTextAreaElement;
                    if (!textarea)
                        return console.error(
                            `Textarea ou mensagem criptografada ausente`
                        );

                    const message = textarea.value;

                    const file = new Blob([message], {
                        type: "text/plain",
                    });
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(file);
                    a.download = textareaId;
                    a.click();
                }}
            >
                <DownloadIcon width={18} height={18} color="white" />
            </Button>
        </div>
    );
}
