import { gabarito } from "@/lib/fonts/gabarito";
import { DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Snippet } from "@nextui-org/snippet";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function UserDropdownSection() {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  return (
    <DropdownSection aria-label="Profile" showDivider>
      <DropdownItem as={Link} href={`/sneaker/${user?.id}`} key="user">
        <div className="flex flex-col">
          <p
            className={`font-black text-primary text-base sm:text-lg ${gabarito.className}`}
          >
            {user?.id}
          </p>
        </div>
      </DropdownItem>
      <DropdownItem key="id" isReadOnly>
        <Snippet
          classNames={{
            content: "hidden",
            pre: "max-w-[calc(100%-32px)] ",
          }}
          className="relative w-full max-w-full p-0 m-0 bg-transparent scrollbar-hide"
          hideSymbol
        >
          <p
            className={`overflow-x-scroll scrollbar-hide text-xs ${gabarito.className}`}
          >
            {user?.id}
          </p>
        </Snippet>
      </DropdownItem>
    </DropdownSection>
  );
}
