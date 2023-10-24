import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const metadata: Metadata = {
  title: "incognitalk.",
  description: "Incognitalk.",
};
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieData = cookies;
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
