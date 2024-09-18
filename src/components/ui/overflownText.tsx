import {useEffect, useRef, useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "./tooltip";
import {cn} from "@/lib/utils";

interface OverflownTextProps {
    children: React.ReactNode;
    className?: string;
}

export default function OverflownText({children, className}: OverflownTextProps) {
    const ref = useRef(null);
    const [isOverflown, setIsOverflown] = useState(false);
    useEffect(() => {
        const element = ref.current! as HTMLElement;
        setIsOverflown(element?.scrollWidth > element?.clientWidth);
    }, []);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild ref={ref}>
                    <p className={cn("overflow-hidden text-ellipsis", className)}>{children}</p>
                </TooltipTrigger>
                <TooltipContent
                    className={cn({
                        hidden: !isOverflown
                    })}
                >
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
