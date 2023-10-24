"use client";
import PortalForm from "@/components/ui/PortalForm";
import Main from "@/components/ui/Main";
import { useUserState } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const user = useUserState();
  const route = useRouter();
  useEffect(() => {
    if (user.isSignedIn) return route.push("/talks");
  }, [user]);
  return (
    <Main>
      <PortalForm />
    </Main>
  );
}
