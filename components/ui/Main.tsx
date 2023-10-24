import { cn } from "@/lib/hooks/cn";
import { HTMLAttributes } from "react";
interface ClassName extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export default function Main({ children, className }: ClassName) {
  return (
    <main
      className={cn(
        "p-4 bg-background max-h-[100dvh] h-screen w-full overflow-x-hidden overflow-y-auto flex flex-col",
        className
      )}
    >
      {children}
    </main>
  );
}
