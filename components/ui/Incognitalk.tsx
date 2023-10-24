import { HTMLAttributes } from "react";
import { cn } from "@/lib/hooks/cn";

interface ClassName extends HTMLAttributes<HTMLHeadingElement> {}

export default function Incognitalk({ className }: ClassName) {
  return (
    <h1 className={cn(`font-black text-4xl text-primary`, className)}>
      incognitalk.
    </h1>
  );
}
