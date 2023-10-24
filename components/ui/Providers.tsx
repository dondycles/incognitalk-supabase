// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useThemeState, useUserState } from "@/lib/store";
import { useEffect, useState } from "react";
import { gabarito } from "@/lib/fonts/gabarito";
import { Session } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [hydrate, setHydrate] = useState(false);
  const theme = useThemeState();
  const user = useUserState();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      user.setId(session.user.id);
      user.setUsername(session.user.email!);
      user.setIsSignedIn(true);

      if (pathname === "/") {
        route.push("/talks");
      }
    }
    if (!session) {
      user.setId("");
      user.setUsername("");
      user.setIsSignedIn(false);
    }
  }, [hydrate, session]);

  useEffect(() => {
    setHydrate(true);
  }, []);

  return (
    <>
      {hydrate && (
        <NextUIProvider
          className={`${theme.mode} ${gabarito.variable} font-gabarito text-foreground text-sm sm:text-base`}
        >
          {children}
        </NextUIProvider>
      )}
    </>
  );
}
