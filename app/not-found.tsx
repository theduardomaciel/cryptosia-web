import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Logo from "@/public/Logo";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col lg:flex-row h-screen items-start lg:items-center justify-center gap-12 lg:gap-20 px-[var(--wrapper)] overflow-hidden relative">
            <div className="hidden lg:flex w-[55%] h-full flex-row items-center justify-center gap-0">
                <LineAnimation />
                <LineAnimation inverse />
                <LineAnimation />
            </div>
            <div className="flex flex-col items-start justify-center gap-12">
                <header className="flex flex-col items-start justify-start gap-6">
                    <Logo />
                    <h1 className="text-primary-200 font-sans text-[5.3125rem] font-extrabold lg:text-[9.375rem] leading-none">
                        404
                        <span className="text-[3.125rem] lg:text-[9.375rem]">
                            ...
                        </span>
                    </h1>
                    <h2 className="text-[var(--neutral)] font-title text-[1.125rem] lg:text-xl lg:max-w-[65%] font-black">
                        Parece que você chegou em um lugar que não existe 🤯
                    </h2>
                </header>
                <div className="flex flex-col items-start justify-start gap-12 w-full">
                    <p className="font-sans text-base font-semibold text-[var(--neutral)]">
                        Nem mesmo nossa criptografia foi capaz de levar você até
                        lá. <br />
                        Enquanto não somos capazes de fazer isso, volte ao{" "}
                        <span className="font-title font-black mx-1 text-lg">
                            crypt*sia
                        </span>{" "}
                        e aproveite a criptografia RSA!
                    </p>
                    <Link href={`/`} className="max-lg:w-full">
                        <Button className="bg-white text-black hover:bg-black hover:text-white px-12 py-2.5">
                            Voltar ao início
                        </Button>
                    </Link>
                </div>
                <p className="absolute top-0 left-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#D9D9D9] dark:from-gray-200/50 bg-clip-text text-transparent -z-50 w-full lg:w-[50vw] h-full select-none pointer-events-none">
                    {PATTERN}
                </p>
            </div>
        </div>
    );
}

const LINE_PATTERN = "&$#$%&$#$";

function LineAnimation({ inverse = false }: { inverse?: boolean }) {
    const randomizedCharacters = LINE_PATTERN.split("").sort(
        () => Math.random() - 0.5
    );

    return (
        <div className="flex flex-col items-start justify-start h-full relative">
            <p
                className={cn(
                    "bg-gradient-to-b from-primary-100/80 font-sans font-extrabold text-[6.25rem] bg-clip-text text-transparent select-none pointer-events-none",
                    {
                        "animate-primaryY_inverse": inverse,
                        "animate-primaryY": !inverse,
                    }
                )}
                style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                }}
            >
                {randomizedCharacters.join("")}
            </p>
            <p
                className={cn(
                    "bg-gradient-to-t from-primary-100/80 font-sans font-extrabold text-[6.25rem] bg-clip-text text-transparent select-none pointer-events-none animate-secondaryY absolute top-[0%] left-0",
                    {
                        "animate-secondaryY_inverse": inverse,
                        "animate-secondaryY": !inverse,
                    }
                )}
                style={{
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                }}
            >
                {randomizedCharacters.join("")}
            </p>
        </div>
    );
}

const PATTERN = `%$#@*#&amp;$(#)@(#*&amp;$*@($@#$|@) @*($&amp; *! @&quot;$*((#$&amp;*#!%$#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$ +@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@! (*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!%$#@*#&amp;$(#)@(#*&amp;$*@($% $#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;! @*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$! @_#( *! @()*#@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*#@_#( *! @()*#*&quot;&amp;$!#_)@#&amp;*%$#@*#%$% $#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;! @*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$! @_#( *! @()*#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@! *($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$! @_#( *! @()*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;% $#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;! @*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$! @_#( *! @()*#!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )% $#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@%$#@*#&amp;$(#)@(#*&amp;$*@($@#$| @)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$! #_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*#$+@_$&amp;*@*(! @&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$% $#@*#&amp;$(#)@(#*&amp;$*@($%$#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$ +@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@! (*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*#@#$|@)$*@$)@_$+@_$&amp;*@*(! @&amp;$*@ !* ($&amp;&quot;!@*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@! (*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*#@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*#$*(#&amp;$*(#$&amp;*(!#&amp;$!@_#( *! @()*# *! ()&amp;$@!(*$ _! )$*(#&amp;$*(#% $#@*#&amp;$(#)@(#*&amp;$*@($@#$|@)$*@$)@_$+@_$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;! @*($&amp; *! @&quot;$*((#$&amp;*# !* &quot;&amp;$!#_)@#&amp; **! ()&amp;$@!(*$ _! )$*(#&amp;$*(#$&amp;*(!#&amp;$! @_#( *! @()*#$&amp;*(!#&amp;$!@_#( *! @()*# @$)@_$+C _$&amp;*@*(!@&amp;$*@ !* ($&amp;&quot;!`;
