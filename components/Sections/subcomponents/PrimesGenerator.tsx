"use client";
import { useCallback, useState } from "react";

// Components
import { Button } from "@/components/ui/Button";
import { Input, InputLabel, InputRoot } from "@/components/ui/Input";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { Slider } from "@/components/ui/Slider";

const MIN_VALUE = 2;
const MAX_VALUE = 5000;

const INITIAL_MIN = 300;
const INITIAL_MAX = 2000;

export default function PrimesGenerator({
    generated,
}: {
    generated: (p: number, q: number) => void;
}) {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const [min, setMin] = useState<number>(INITIAL_MIN);
    const [max, setMax] = useState<number>(INITIAL_MAX);

    const generateRandomPrime = useCallback(() => {
        // Garantimos que nada irá quebrar
        if (min > max) {
            setMin(max);
            setMax(min);
        }

        if (min < MIN_VALUE) setMin(MIN_VALUE);
        if (max > MAX_VALUE) setMax(MAX_VALUE);

        // Geramos os primos
        const p = generatePrimeNumber(min, max);

        if (!p) throw new Error("Não foi possível gerar um número primo.");

        const q = generatePrimeNumber(min, max, [p]);

        if (!q) throw new Error("Não foi possível gerar um número primo.");

        const p_input = document.getElementById("p") as HTMLInputElement;
        const q_input = document.getElementById("q") as HTMLInputElement;

        p_input.value = p.toString();
        q_input.value = q.toString();

        setIsPopoverOpen(false);
        console.log("Gerado com sucesso!" + p + " " + q);
        generated(p, q);
    }, [min, max]);

    return (
        <Popover
            open={isPopoverOpen}
            onOpenChange={(isOpen) => setIsPopoverOpen(isOpen)}
        >
            <PopoverTrigger className="flex flex-row items-center justify-center bg-black text-white hover:bg-bg-01 transition-colors rounded-full text-sm font-sans font-bold px-4 py-2 gap-2 max-md:w-full w-fit">
                <TriggerIcon />
                Gere um par aleatório
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4">
                <div className="grid gap-4 w-full">
                    {/* <div className="space-y-2">
                        <h4 className="font-medium leading-none">Gerar primos</h4>
                        <p className="text-sm text-muted-foreground">
                            Determine o alcance dos números que serão gerados.
                        </p>
                    </div> */}
                    <div className="grid gap-2">
                        <InputRoot className="grid grid-cols-3 items-center gap-4">
                            <InputLabel className="text-white font-sans">
                                Mínimo
                            </InputLabel>
                            <Input
                                className="bg-white text-black col-span-2 text-center font-bold"
                                type="number"
                                min={MIN_VALUE}
                                max={max}
                                value={min}
                                onChange={(e) =>
                                    setMin(parseInt(e.target.value))
                                }
                                onBlur={(e) => {
                                    if (parseInt(e.target.value) < MIN_VALUE)
                                        setMin(MIN_VALUE);
                                }}
                            />
                        </InputRoot>
                        <InputRoot className="grid grid-cols-3 items-center gap-4">
                            <InputLabel className="text-white font-sans">
                                Máximo
                            </InputLabel>
                            <Input
                                className="bg-white text-black col-span-2 text-center font-bold"
                                type="number"
                                min={max}
                                max={100000}
                                value={max}
                                onChange={(e) =>
                                    setMax(parseInt(e.target.value))
                                }
                                onBlur={(e) => {
                                    if (parseInt(e.target.value) > MAX_VALUE)
                                        setMax(MAX_VALUE);
                                }}
                            />
                        </InputRoot>
                    </div>
                </div>
                <Slider
                    className="w-full"
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    defaultValue={[min, max]}
                    step={10}
                    minStepsBetweenThumbs={1}
                    onValueChange={(value) => {
                        setMin(value[0]);
                        setMax(value[1]);
                    }}
                />
                <Button
                    className="bg-white text-black w-full py-1 hover:bg-white-100 hover:ring hover:ring-white hover:outline-black"
                    type="button"
                    onClick={generateRandomPrime}
                >
                    Gerar par aleatório
                </Button>
            </PopoverContent>
        </Popover>
    );
}

function TriggerIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_233_1310"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="18"
                height="18"
            >
                <rect width="18" height="18" fill="white" />
            </mask>
            <g mask="url(#mask0_233_1310)">
                <path
                    d="M3 14.9999C2.5875 14.9999 2.23438 14.8531 1.94063 14.5593C1.64688 14.2656 1.5 13.9124 1.5 13.4999V4.49994C1.5 4.08744 1.64688 3.73431 1.94063 3.44056C2.23438 3.14681 2.5875 2.99994 3 2.99994H15C15.4125 2.99994 15.7656 3.14681 16.0594 3.44056C16.3531 3.73431 16.5 4.08744 16.5 4.49994V13.4999C16.5 13.9124 16.3531 14.2656 16.0594 14.5593C15.7656 14.8531 15.4125 14.9999 15 14.9999H3ZM3 13.4999H15V4.49994H3V13.4999ZM5.30625 11.2499C5.43125 11.2499 5.53438 11.2093 5.61563 11.1281C5.69688 11.0468 5.7375 10.9437 5.7375 10.8187V7.23744C5.7375 7.09994 5.69063 6.98431 5.59688 6.89056C5.50313 6.79681 5.3875 6.74994 5.25 6.74994C5.1875 6.74994 5.12813 6.75931 5.07188 6.77806C5.01563 6.79681 4.9625 6.82494 4.9125 6.86244L4.06875 7.46244C3.98125 7.52494 3.92813 7.60619 3.90938 7.70619C3.89063 7.80619 3.9125 7.90619 3.975 8.00619C4.0375 8.10619 4.12188 8.16556 4.22813 8.18431C4.33438 8.20306 4.4375 8.18119 4.5375 8.11869L4.875 7.87494V10.8187C4.875 10.9437 4.91562 11.0468 4.99687 11.1281C5.07812 11.2093 5.18125 11.2499 5.30625 11.2499ZM7.575 11.2499H9.75C9.85 11.2499 9.9375 11.2124 10.0125 11.1374C10.0875 11.0624 10.125 10.9749 10.125 10.8749C10.125 10.7749 10.0875 10.6874 10.0125 10.6124C9.9375 10.5374 9.85 10.4999 9.75 10.4999H8.3625L8.325 10.4624C8.5875 10.2124 8.80313 9.99994 8.97188 9.82494C9.14063 9.64994 9.275 9.51244 9.375 9.41244C9.6 9.18744 9.76875 8.96244 9.88125 8.73744C9.99375 8.51244 10.05 8.27494 10.05 8.02494C10.05 7.66244 9.9125 7.35931 9.6375 7.11556C9.3625 6.87181 9.0125 6.74994 8.5875 6.74994C8.3375 6.74994 8.1 6.80931 7.875 6.92806C7.65 7.04681 7.46875 7.21244 7.33125 7.42494C7.26875 7.51244 7.2625 7.60619 7.3125 7.70619C7.3625 7.80619 7.4375 7.87494 7.5375 7.91244C7.6375 7.94994 7.7375 7.94994 7.8375 7.91244C7.9375 7.87494 8.025 7.81869 8.1 7.74369C8.1625 7.68119 8.23438 7.63119 8.31563 7.59369C8.39688 7.55619 8.4875 7.53744 8.5875 7.53744C8.775 7.53744 8.92812 7.58744 9.04688 7.68744C9.16563 7.78744 9.225 7.91244 9.225 8.06244C9.225 8.19994 9.2 8.32806 9.15 8.44681C9.1 8.56556 8.9875 8.71244 8.8125 8.88744L7.3125 10.3874C7.2875 10.4124 7.25 10.4999 7.2 10.6499V10.8749C7.2 10.9749 7.2375 11.0624 7.3125 11.1374C7.3875 11.2124 7.475 11.2499 7.575 11.2499ZM12.75 11.2499C13.2 11.2499 13.5625 11.1249 13.8375 10.8749C14.1125 10.6249 14.25 10.2999 14.25 9.89994C14.25 9.67494 14.1875 9.47494 14.0625 9.29994C13.9375 9.12494 13.7625 8.98744 13.5375 8.88744V8.84994C13.7125 8.74994 13.85 8.62181 13.95 8.46556C14.05 8.30931 14.1 8.12494 14.1 7.91244C14.1 7.57494 13.9687 7.29681 13.7062 7.07806C13.4437 6.85931 13.1125 6.74994 12.7125 6.74994C12.4625 6.74994 12.2313 6.80931 12.0188 6.92806C11.8063 7.04681 11.6312 7.19369 11.4937 7.36869C11.4312 7.45619 11.425 7.54369 11.475 7.63119C11.525 7.71869 11.6 7.78744 11.7 7.83744C11.8 7.87494 11.9 7.87806 12 7.84681C12.1 7.81556 12.1875 7.76244 12.2625 7.68744C12.325 7.62494 12.3937 7.57806 12.4688 7.54681C12.5438 7.51556 12.625 7.49994 12.7125 7.49994C12.875 7.49994 13.0094 7.54681 13.1156 7.64056C13.2219 7.73431 13.275 7.84994 13.275 7.98744C13.275 8.16244 13.2125 8.29994 13.0875 8.39994C12.9625 8.49994 12.8 8.54994 12.6 8.54994C12.5 8.54994 12.4125 8.58744 12.3375 8.66244C12.2625 8.73744 12.225 8.82494 12.225 8.92494C12.225 9.02494 12.2625 9.11244 12.3375 9.18744C12.4125 9.26244 12.5 9.29994 12.6 9.29994C12.85 9.29994 13.05 9.34994 13.2 9.44994C13.35 9.54994 13.425 9.68744 13.425 9.86244C13.425 10.0249 13.3563 10.1656 13.2188 10.2843C13.0812 10.4031 12.925 10.4624 12.75 10.4624C12.6 10.4624 12.475 10.4374 12.375 10.3874C12.275 10.3374 12.1875 10.2562 12.1125 10.1437C12.05 10.0562 11.9719 9.99681 11.8781 9.96556C11.7844 9.93431 11.6875 9.93744 11.5875 9.97494C11.475 10.0249 11.3938 10.0968 11.3438 10.1906C11.2937 10.2843 11.2937 10.3812 11.3438 10.4812C11.4813 10.7312 11.6687 10.9218 11.9062 11.0531C12.1438 11.1843 12.425 11.2499 12.75 11.2499Z"
                    fill="white"
                />
            </g>
        </svg>
    );
}

function generatePrimeNumber(
    min: number,
    max: number,
    exceptions: number[] = []
) {
    const primes: number[] = [];
    for (let i = min; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0 || exceptions.includes(i)) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes[Math.floor(Math.random() * primes.length)];
}
